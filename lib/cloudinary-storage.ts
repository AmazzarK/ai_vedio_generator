import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Check if Cloudinary is configured
 */
export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Upload audio file to Cloudinary with retry logic
 * @param localFilePath - Path to the local audio file
 * @param fileName - Optional custom file name
 * @param maxRetries - Number of retry attempts (default: 3)
 * @returns Public URL of the uploaded file or local path fallback
 */
export async function uploadAudioToCloudinary(
  localFilePath: string,
  fileName?: string,
  maxRetries: number = 3
): Promise<UploadResult> {
  try {
    // Check if Cloudinary is configured
    if (!isCloudinaryConfigured()) {
      console.warn('⚠️ Cloudinary not configured, using local storage');
      return {
        success: true,
        url: localFilePath, // Return local path as fallback
      };
    }

    // Check if file exists
    if (!fs.existsSync(localFilePath)) {
      return {
        success: false,
        error: 'File not found: ' + localFilePath
      };
    }

    let lastError: any;

    // Retry logic
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`📤 Uploading to Cloudinary (attempt ${attempt}/${maxRetries}): ${localFilePath}`);

        const result = await cloudinary.uploader.upload(localFilePath, {
          resource_type: 'video', // 'video' works for audio files too
          folder: 'audio',
          public_id: fileName,
          overwrite: true,
          timeout: 60000, // 60 second timeout
        });

        // Delete local file after successful upload
        try {
          fs.unlinkSync(localFilePath);
          console.log('🗑️ Local file deleted:', localFilePath);
        } catch (err) {
          console.warn('⚠️ Could not delete local file:', err);
        }

        console.log('✅ Audio uploaded to Cloudinary:', result.secure_url);

        return {
          success: true,
          url: result.secure_url
        };

      } catch (error: any) {
        lastError = error;
        console.warn(`⚠️ Upload attempt ${attempt} failed:`, error.message);

        // Wait before retrying (exponential backoff)
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // All retries failed, fallback to local storage
    console.error('❌ All Cloudinary upload attempts failed, using local storage');
    console.error('Last error:', lastError?.message);

    return {
      success: true,
      url: localFilePath, // Return local path as fallback
    };

  } catch (error: any) {
    console.error('❌ Cloudinary upload error:', error);
    
    // Fallback to local storage on any error
    if (fs.existsSync(localFilePath)) {
      console.log('📂 Falling back to local storage');
      return {
        success: true,
        url: localFilePath,
      };
    }

    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Delete audio file from Cloudinary
 * @param publicId - The public ID of the file (e.g., 'audio/123456')
 */
export async function deleteAudioFromCloudinary(publicId: string): Promise<boolean> {
  try {
    if (!isCloudinaryConfigured()) {
      console.warn('⚠️ Cloudinary not configured');
      return false;
    }

    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
    console.log('✅ Audio deleted from Cloudinary:', publicId);
    return true;
  } catch (error: any) {
    console.error('❌ Cloudinary delete error:', error.message);
    return false;
  }
}

