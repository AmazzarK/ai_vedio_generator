/**
 * Video Assembly Module
 * Handles FFmpeg-based video rendering and composition
 * 
 * REQUIREMENTS:
 * - FFmpeg must be installed: https://ffmpeg.org/download.html
 * - For Windows: winget install FFmpeg or download from https://ffmpeg.org/download.html
 * 
 * INSTALLATION:
 * npm install fluent-ffmpeg @types/fluent-ffmpeg
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

export interface VideoAssemblyOptions {
  audioUrl: string;
  images: Array<{
    url: string;
    duration: number; // seconds
  }>;
  outputPath: string;
  width?: number;
  height?: number;
  fps?: number;
}

export interface VideoAssemblyResult {
  success: boolean;
  videoPath?: string;
  error?: string;
}

/**
 * Check if FFmpeg is installed
 */
export async function checkFFmpeg(): Promise<boolean> {
  try {
    await execAsync('ffmpeg -version');
    return true;
  } catch {
    return false;
  }
}

/**
 * Assemble video from images and audio
 * 
 * This function:
 * 1. Downloads images locally (if URLs are provided)
 * 2. Creates an image sequence
 * 3. Combines audio with images using FFmpeg
 * 4. Outputs final video file
 * 
 * @param options - Video assembly options
 * @returns Result with video path or error
 */
export async function assembleVideo(
  options: VideoAssemblyOptions
): Promise<VideoAssemblyResult> {
  try {
    const {
      audioUrl,
      images,
      outputPath,
      width = 1080,
      height = 1920,
      fps = 24,
    } = options;

    // Validate inputs
    if (!audioUrl) {
      throw new Error('Audio URL is required');
    }

    if (!images || images.length === 0) {
      throw new Error('At least one image is required');
    }

    if (!outputPath) {
      throw new Error('Output path is required');
    }

    console.log('🎬 Starting video assembly...');
    console.log(`   Images: ${images.length}, Audio: ${audioUrl}`);
    console.log(`   Resolution: ${width}x${height}, FPS: ${fps}`);

    // Check FFmpeg availability
    const ffmpegAvailable = await checkFFmpeg();
    if (!ffmpegAvailable) {
      throw new Error(
        'FFmpeg not found. Please install FFmpeg: https://ffmpeg.org/download.html'
      );
    }

    // Create temporary directory for processing
    const tempDir = path.join(process.cwd(), 'public', 'temp', `video-${Date.now()}`);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    console.log('📂 Temporary directory created:', tempDir);

    // Download images locally
    const localImages = await downloadImages(images, tempDir);

    // Create image sequence
    const imageList = path.join(tempDir, 'images.txt');
    createImageList(localImages, imageList);

    // Get output directory
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Build FFmpeg command
    const ffmpegCommand = buildFFmpegCommand({
      imageListFile: imageList,
      audioUrl,
      outputFile: outputPath,
      width,
      height,
      fps,
    });

    console.log('🎥 Running FFmpeg command...');
    console.log(`   Command: ${ffmpegCommand.substring(0, 100)}...`);

    // Execute FFmpeg
    await execAsync(ffmpegCommand);

    console.log('✅ Video assembled successfully!');
    console.log(`   Output: ${outputPath}`);

    // Cleanup temporary files
    cleanupTempDirectory(tempDir);

    return {
      success: true,
      videoPath: outputPath,
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Video assembly failed:', errorMessage, error);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Download images from URLs to local directory
 */
async function downloadImages(
  images: Array<{ url: string; duration: number }>,
  outputDir: string
): Promise<Array<{ path: string; duration: number }>> {
  console.log(`📥 Downloading ${images.length} images...`);

  const localImages = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    try {
      const localPath = path.join(outputDir, `image-${i}.jpg`);

      // For local paths, just copy; for URLs, download
      if (image.url.startsWith('/')) {
        const sourcePath = path.join(process.cwd(), 'public', image.url);
        fs.copyFileSync(sourcePath, localPath);
      } else if (image.url.startsWith('http')) {
        // Download from URL
        const response = await fetch(image.url);
        if (!response.ok) throw new Error(`Failed to fetch ${image.url}`);
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(localPath, Buffer.from(buffer));
      } else {
        throw new Error(`Invalid image URL: ${image.url}`);
      }

      localImages.push({
        path: localPath,
        duration: image.duration,
      });

      console.log(`  ✅ Downloaded image ${i + 1}/${images.length}`);
    } catch (error) {
      console.error(`  ❌ Failed to download image ${i}:`, error);
      throw error;
    }
  }

  return localImages;
}

/**
 * Create image list file for FFmpeg concat demuxer
 */
function createImageList(
  images: Array<{ path: string; duration: number }>,
  outputFile: string
): void {
  const lines = images.map(img => `file '${img.path}'\nduration ${img.duration}`).join('\n');
  fs.writeFileSync(outputFile, lines);
  console.log('📋 Image list created');
}

/**
 * Build FFmpeg command for video assembly
 */
function buildFFmpegCommand(options: {
  imageListFile: string;
  audioUrl: string;
  outputFile: string;
  width: number;
  height: number;
  fps: number;
}): string {
  const {
    imageListFile,
    audioUrl,
    outputFile,
    width,
    height,
    fps,
  } = options;

  // Escape paths for shell
  const escapePath = (p: string) => `"${p.replace(/"/g, '\\"')}"`;

  return (
    `ffmpeg -y ` +
    `-f concat -safe 0 -i ${escapePath(imageListFile)} ` +
    `-i ${escapePath(audioUrl)} ` +
    `-c:v libx264 -pix_fmt yuv420p ` +
    `-vf "scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2" ` +
    `-r ${fps} ` +
    `-c:a aac -b:a 128k ` +
    `-shortest ` +
    `${escapePath(outputFile)}`
  );
}

/**
 * Cleanup temporary directory
 */
function cleanupTempDirectory(tempDir: string): void {
  try {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log('🧹 Temporary files cleaned up');
    }
  } catch (error) {
    console.warn('⚠️ Failed to cleanup temporary directory:', error);
  }
}

/**
 * Get video file information
 */
export async function getVideoInfo(videoPath: string): Promise<{
  duration?: number;
  width?: number;
  height?: number;
  size?: number;
  error?: string;
}> {
  try {
    const command = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1:noprint_wrappers=1 "${videoPath}"`;
    const { stdout } = await execAsync(command);
    const duration = parseFloat(stdout.trim());

    const stats = fs.statSync(videoPath);

    return {
      duration,
      size: stats.size,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
