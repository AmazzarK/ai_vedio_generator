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
 * Upload audio file to Cloudinary
 * @param localFilePath - Path to the local audio file
 * @param fileName - Optional custom file name
 * @returns Public URL of the uploaded file
 */
export async function uploadAudioToCloudinary(
  localFilePath: string,
  fileName?: string
): Promise<UploadResult> {
  try {
    // Check if file exists
    if (!fs.existsSync(localFilePath)) {
      return {
        success: false,
        error: 'File not found: ' + localFilePath
      };
    }

    console.log('📤 Uploading to Cloudinary:', localFilePath);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'video', // 'video' works for audio files too
      folder: 'audio',
      public_id: fileName,
      overwrite: true,
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
    console.error('❌ Cloudinary upload error:', error);
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
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
    console.log('✅ Audio deleted from Cloudinary:', publicId);
    return true;
  } catch (error) {
    console.error('❌ Cloudinary delete error:', error);
    return false;
  }
}
