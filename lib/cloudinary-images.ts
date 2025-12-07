import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with increased timeout
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 120000, // 120 seconds timeout
});

export interface CloudinaryImageUploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

/**
 * Upload image buffer to Cloudinary with retry logic
 * @param imageBuffer - Image buffer
 * @param folder - Cloudinary folder (default: 'video-frames')
 * @param retries - Number of retry attempts (default: 3)
 * @returns Upload result with URL
 */
export async function uploadImageToCloudinary(
  imageBuffer: Buffer,
  folder: string = 'video-frames',
  retries: number = 3
): Promise<CloudinaryImageUploadResult> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await new Promise<CloudinaryImageUploadResult>((resolve, reject) => {
        // Set a timeout for the upload operation
        const timeoutId = setTimeout(() => {
          reject(new Error('Upload timeout after 60 seconds'));
        }, 60000); // 60 second timeout per attempt

        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'image',
            format: 'jpg', // Use JPG instead of PNG for faster uploads
            quality: 80, // Compress to 80% quality
            public_id: `frame_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timeout: 60000, // 60 seconds
          },
          (error, result) => {
            clearTimeout(timeoutId);
            
            if (error) {
              console.error(`Cloudinary upload error (attempt ${attempt}/${retries}):`, error);
              reject(error);
            } else if (result) {
              console.log(`✅ Image uploaded to Cloudinary (attempt ${attempt}):`, result.secure_url);
              resolve({
                success: true,
                url: result.secure_url,
                publicId: result.public_id,
              });
            } else {
              reject(new Error('No result from Cloudinary'));
            }
          }
        );

        // Write buffer to stream
        uploadStream.end(imageBuffer);
      });

      // If successful, return immediately
      return result;
    } catch (error) {
      lastError = error;
      console.error(`Upload attempt ${attempt}/${retries} failed:`, error);
      
      // Wait before retrying (exponential backoff)
      if (attempt < retries) {
        const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Max 5 seconds
        console.log(`⏳ Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  // All retries failed
  return {
    success: false,
    error: lastError instanceof Error ? lastError.message : 'Upload failed after all retries',
  };
}

/**
 * Upload multiple images to Cloudinary (sequentially to avoid timeout)
 * @param imageBuffers - Array of image buffers
 * @param folder - Cloudinary folder
 * @returns Array of upload results
 */
export async function uploadMultipleImagesToCloudinary(
  imageBuffers: Buffer[],
  folder: string = 'video-frames'
): Promise<CloudinaryImageUploadResult[]> {
  console.log(`Uploading ${imageBuffers.length} images to Cloudinary (sequentially)...`);

  const results: CloudinaryImageUploadResult[] = [];
  
  // Upload sequentially instead of parallel to avoid overwhelming the API
  for (let i = 0; i < imageBuffers.length; i++) {
    console.log(`📤 Uploading image ${i + 1}/${imageBuffers.length}...`);
    const result = await uploadImageToCloudinary(imageBuffers[i], folder);
    results.push(result);
    
    // Small delay between uploads to avoid rate limiting
    if (i < imageBuffers.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
    }
  }

  const successCount = results.filter((r) => r.success).length;
  console.log(`✅ Uploaded ${successCount}/${imageBuffers.length} images to Cloudinary`);

  return results;
}

/**
 * Delete image from Cloudinary
 * @param publicId - Cloudinary public ID
 * @returns Success status
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<boolean> {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log('🗑️ Image deleted from Cloudinary:', publicId);
    return true;
  } catch (error) {
    console.error('Failed to delete from Cloudinary:', error);
    return false;
  }
}
