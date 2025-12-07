import { HfInference } from '@huggingface/inference';

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export interface ImageGenerationOptions {
  prompt: string;
  model?: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  numInferenceSteps?: number;
  guidanceScale?: number;
}

export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  imageBlob?: Blob | string; // Can be Blob or base64 string
  error?: string;
  model?: string;
}

// Available models (all FREE!)
export const HUGGINGFACE_MODELS = {
  // Stable Diffusion XL (Best quality, slower)
  SDXL: 'stabilityai/stable-diffusion-xl-base-1.0',
  
  // Stable Diffusion 2.1 (Fast, good quality)
  SD21: 'stabilityai/stable-diffusion-2-1',
  
  // Flux (NEW - High quality)
  FLUX_SCHNELL: 'black-forest-labs/FLUX.1-schnell',
  
  // Realistic Vision (Photorealistic)
  REALISTIC: 'SG161222/Realistic_Vision_V5.1_noVAE',
  
  // DreamShaper (Artistic)
  DREAMSHAPER: 'Lykon/DreamShaper',
};

/**
 * Generate image using Hugging Face Inference API
 * @param options - Image generation options
 * @returns Result with image blob or error
 */
export async function generateImage(
  options: ImageGenerationOptions
): Promise<ImageGenerationResult> {
  try {
    const {
      prompt,
      model = HUGGINGFACE_MODELS.SDXL,
      negativePrompt = 'blurry, bad quality, distorted, ugly, low resolution',
      width = 1024,
      height = 1024,
      numInferenceSteps = 50,
      guidanceScale = 7.5,
    } = options;

    console.log('Generating image with Hugging Face...', { prompt, model });

    // Validate API key
    if (!process.env.HUGGINGFACE_API_KEY) {
      throw new Error('HUGGINGFACE_API_KEY is not configured');
    }

    // Generate image
    const response = await hf.textToImage({
      model,
      inputs: prompt,
      parameters: {
        negative_prompt: negativePrompt,
        width,
        height,
        num_inference_steps: numInferenceSteps,
        guidance_scale: guidanceScale,
      },
    });

    console.log('✅ Image generated successfully');

    // The response can be a Blob or string depending on the API
    return {
      success: true,
      imageBlob: response,
      model,
    };
  } catch (error) {
    console.error('Hugging Face image generation failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generate multiple images from prompts
 * @param prompts - Array of prompts
 * @param model - Model to use
 * @returns Array of results
 */
export async function generateMultipleImages(
  prompts: string[],
  model?: string
): Promise<ImageGenerationResult[]> {
  console.log(`Generating ${prompts.length} images...`);

  const results = await Promise.all(
    prompts.map((prompt) =>
      generateImage({
        prompt,
        model,
      })
    )
  );

  const successCount = results.filter((r) => r.success).length;
  console.log(`✅ Generated ${successCount}/${prompts.length} images successfully`);

  return results;
}

/**
 * Convert Blob to Base64 string
 * @param blob - Image blob
 * @returns Base64 string
 */
export async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:image/png;base64,${base64}`;
}

/**
 * Convert Blob to Buffer
 * @param blob - Image blob
 * @returns Buffer
 */
export async function blobToBuffer(blob: Blob): Promise<Buffer> {
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
