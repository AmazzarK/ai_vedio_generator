import { HfInference } from '@huggingface/inference';
import { generateAudioWithCaptions } from './text-to-media';
import { generateMultipleImages, blobToBuffer } from './huggingface-images';
import { uploadMultipleImagesToCloudinary } from './cloudinary-images';

export interface VideoGenerationOptions {
  userPrompt: string;
  platform?: string;
  videoStyle?: string;
  videoLength?: '15s' | '30s' | '60s';
  language?: 'en' | 'ar' | 'fr';
  voiceGender?: 'male' | 'female';
  imageModel?: string;
}

export interface SceneData {
  sceneNumber: number;
  duration: number; // seconds
  imagePrompt: string;
  narration: string;
}

export interface VideoGenerationResult {
  success: boolean;
  videoId?: string;
  script?: string;
  scenes?: SceneData[];
  audioUrl?: string;
  captions?: {
    srt?: string;
    vtt?: string;
  };
  images?: string[]; // Cloudinary URLs
  error?: string;
  message?: string;
}

/**
 * COMPLETE VIDEO GENERATION WORKFLOW
 * 
 * 1. Hugging Face Llama → Generate script + scene descriptions + image prompts
 * 2. Script → Audio (TTS) + Captions (AssemblyAI)
 * 3. Image Prompts → Generate Images (Hugging Face)
 * 4. Upload Images to Cloudinary
 * 5. Return everything ready for video rendering
 */
export async function generateCompleteVideo(
  options: VideoGenerationOptions
): Promise<VideoGenerationResult> {
  try {
    const {
      userPrompt,
      platform = 'YouTube',
      videoStyle = 'Cinematic',
      videoLength = '30s',
      language = 'en',
      voiceGender = 'female',
      imageModel,
    } = options;

    console.log('🎬 Starting complete video generation workflow...');
    console.log({
      userPrompt,
      platform,
      videoStyle,
      videoLength,
      language,
    });

    // ============================================
    // STEP 1: Generate Script + Image Prompts with Hugging Face
    // ============================================
    console.log('\n📝 STEP 1/4: Generating script and image prompts with Hugging Face AI...');

    const scriptResult = await generateScriptWithImagePrompts({
      userPrompt,
      platform,
      videoStyle,
      videoLength,
      language,
    });

    if (!scriptResult.success || !scriptResult.scenes) {
      return {
        success: false,
        error: scriptResult.error || 'Failed to generate script',
      };
    }

    console.log(`✅ Generated ${scriptResult.scenes.length} scenes with image prompts`);

    // ============================================
    // STEP 2: Generate Audio + Captions
    // ============================================
    console.log('\n🎙️ STEP 2/4: Generating audio and captions...');

    // Combine all narration into one script
    const fullNarration = scriptResult.scenes
      .map((scene) => scene.narration)
      .join(' ');

    const mediaResult = await generateAudioWithCaptions({
      text: fullNarration,
      language,
      gender: voiceGender,
      storage: 'cloudinary',
      generateCaptions: true,
      captionFormat: 'srt',
    });

    if (!mediaResult.success || !mediaResult.audioUrl) {
      return {
        success: false,
        script: scriptResult.script,
        scenes: scriptResult.scenes,
        error: 'Failed to generate audio',
      };
    }

    console.log('✅ Audio and captions generated');

    // ============================================
    // STEP 3: Generate Images with Hugging Face
    // ============================================
    console.log('\n🎨 STEP 3/4: Generating images with Hugging Face...');

    const imagePrompts = scriptResult.scenes.map((scene) => scene.imagePrompt);

    const imageResults = await generateMultipleImages(imagePrompts, imageModel);

    const successfulImages = imageResults.filter((r) => r.success);

    if (successfulImages.length === 0) {
      return {
        success: false,
        script: scriptResult.script,
        scenes: scriptResult.scenes,
        audioUrl: mediaResult.audioUrl,
        captions: {
          srt: mediaResult.captions?.srt,
          vtt: mediaResult.captions?.vtt,
        },
        error: 'Failed to generate images',
      };
    }

    console.log(`✅ Generated ${successfulImages.length}/${imagePrompts.length} images`);

    // ============================================
    // STEP 4: Upload Images to Cloudinary
    // ============================================
    console.log('\n☁️ STEP 4/4: Uploading images to Cloudinary...');

    const imageBuffers: Buffer[] = [];
    for (const imgResult of successfulImages) {
      if (imgResult.imageBlob) {
        let buffer: Buffer;
        
        // Handle both Blob and string (base64 or URL) types
        if (typeof imgResult.imageBlob === 'string') {
          // If it's a base64 string, remove the data URL prefix if present
          const base64Data = imgResult.imageBlob.replace(/^data:image\/\w+;base64,/, '');
          buffer = Buffer.from(base64Data, 'base64');
        } else {
          // It's a Blob
          buffer = await blobToBuffer(imgResult.imageBlob);
        }
        
        imageBuffers.push(buffer);
      }
    }

    const uploadResults = await uploadMultipleImagesToCloudinary(imageBuffers);

    const imageUrls = uploadResults
      .filter((r) => r.success && r.url)
      .map((r) => r.url!);

    if (imageUrls.length === 0) {
      return {
        success: false,
        script: scriptResult.script,
        scenes: scriptResult.scenes,
        audioUrl: mediaResult.audioUrl,
        captions: {
          srt: mediaResult.captions?.srt,
          vtt: mediaResult.captions?.vtt,
        },
        error: 'Failed to upload images to Cloudinary',
      };
    }

    console.log(`✅ Uploaded ${imageUrls.length} images to Cloudinary`);

    // ============================================
    // SUCCESS: Return Complete Video Data
    // ============================================
    console.log('\n🎉 Complete video generation successful!');

    return {
      success: true,
      script: scriptResult.script,
      scenes: scriptResult.scenes,
      audioUrl: mediaResult.audioUrl,
      captions: {
        srt: mediaResult.captions?.srt,
        vtt: mediaResult.captions?.vtt,
      },
      images: imageUrls,
      message: 'Video assets generated successfully. Ready for rendering!',
    };
  } catch (error) {
    console.error('❌ Complete video generation failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generate script with scene descriptions and image prompts using Gemini
 */
async function generateScriptWithImagePrompts(options: {
  userPrompt: string;
  platform: string;
  videoStyle: string;
  videoLength: string;
  language: string;
}): Promise<{
  success: boolean;
  script?: string;
  scenes?: SceneData[];
  error?: string;
}> {
  try {
    const { userPrompt, platform, videoStyle, videoLength, language } = options;

    // Initialize Hugging Face Inference
    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || '');

    // Calculate number of scenes based on video length
    const sceneCounts = {
      '15s': 3,
      '30s': 5,
      '60s': 10,
    };
    const numScenes = sceneCounts[videoLength as keyof typeof sceneCounts] || 5;

    // Create prompt for Gemini
    const systemPrompt = `You are an expert video content creator. Generate a complete video plan for a ${videoLength} video.

User Request: ${userPrompt}
Platform: ${platform}
Video Style: ${videoStyle}
Number of Scenes: ${numScenes}
Language: ${language}

IMPORTANT: You MUST respond in valid JSON format with this EXACT structure:

{
  "script": "The complete narration script as one continuous text",
  "scenes": [
    {
      "sceneNumber": 1,
      "duration": 3,
      "imagePrompt": "Detailed image generation prompt for this scene (be very descriptive for AI image generation)",
      "narration": "What is said during this scene"
    }
  ]
}

Requirements:
1. The script field contains the FULL narration text
2. Each scene has a detailed imagePrompt suitable for AI image generation (include style, composition, lighting, mood)
3. The narration for each scene
4. Scene durations should add up to approximately ${videoLength}
5. Image prompts should be highly detailed and specific for ${videoStyle} style
6. Do NOT include any markdown, code blocks, or explanations - ONLY the JSON object

Example image prompt: "A cinematic wide-angle shot of a modern office workspace, professional lighting, bokeh background, highly detailed, photorealistic, 4k quality"`;

    // Generate content using Hugging Face Text Generation (more reliable for free tier)
    let responseText = '';
    try {
      // Use text generation with a free, reliable model
      const response = await hf.textGeneration({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        inputs: systemPrompt,
        parameters: {
          max_new_tokens: 2000,
          temperature: 0.7,
          return_full_text: false,
        }
      });
      
      responseText = response.generated_text || '';
    } catch (error) {
      console.log('Mistral failed, trying Google Flan-T5...');
      try {
        // Fallback to a completely free model
        const response = await hf.textGeneration({
          model: "google/flan-t5-large",
          inputs: systemPrompt,
          parameters: {
            max_new_tokens: 2000,
            temperature: 0.7,
          }
        });
        
        responseText = response.generated_text || '';
      } catch (fallbackError) {
        console.log('All Hugging Face models failed, using fallback generation...');
        // Manual fallback - generate a simple structured response
        responseText = JSON.stringify(generateFallbackScript(userPrompt, numScenes, videoLength, videoStyle));
      }
    }

    // Clean up response - remove markdown code blocks if present
    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    // Parse JSON response
    const parsed = JSON.parse(responseText);

    if (!parsed.script || !parsed.scenes || !Array.isArray(parsed.scenes)) {
      throw new Error('Invalid response format from Hugging Face');
    }

    return {
      success: true,
      script: parsed.script,
      scenes: parsed.scenes,
    };
  } catch (error) {
    console.error('Failed to generate script with image prompts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generate a basic fallback script when AI models are unavailable
 */
function generateFallbackScript(
  userPrompt: string,
  numScenes: number,
  videoLength: string,
  videoStyle: string
): { script: string; scenes: SceneData[] } {
  const sceneDuration = videoLength === '15s' ? 5 : videoLength === '30s' ? 6 : 6;
  
  const scenes: SceneData[] = [];
  const script = `Welcome to this video about ${userPrompt}. ${
    videoStyle === 'Cinematic' ? 'Let\'s explore this topic in a cinematic way.' : 
    videoStyle === 'Documentary' ? 'This documentary will guide you through the details.' :
    'Let\'s dive into this exciting topic.'
  } ${Array.from({ length: numScenes - 2 }, (_, i) => 
    `Scene ${i + 2} brings more insights about ${userPrompt}.`
  ).join(' ')} Thank you for watching.`;

  for (let i = 1; i <= numScenes; i++) {
    scenes.push({
      sceneNumber: i,
      duration: sceneDuration,
      imagePrompt: `${videoStyle} style image showing ${userPrompt}, scene ${i}, professional quality, detailed, high resolution`,
      narration: i === 1 
        ? `Welcome to this video about ${userPrompt}` 
        : i === numScenes 
        ? 'Thank you for watching'
        : `Scene ${i} provides more information about ${userPrompt}`,
    });
  }

  return { script, scenes };
}
