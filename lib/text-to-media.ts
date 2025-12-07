import { generateAudio } from './text-to-speech';
import { generateCaptions } from './assemblyai-captions';

export interface TextToMediaOptions {
  text: string;
  language?: 'en' | 'ar' | 'fr';
  gender?: 'male' | 'female';
  provider?: 'edge' | 'gtts';
  storage?: 'local' | 'cloudinary';
  generateCaptions?: boolean;
  captionFormat?: 'srt' | 'vtt' | 'json';
  speakerLabels?: boolean;
}

export interface TextToMediaResult {
  success: boolean;
  audioUrl?: string;
  storage?: 'cloudinary' | 'local';
  captions?: {
    srt?: string;
    vtt?: string;
    rawText?: string;
    transcriptId?: string;
    wordsCount?: number;
    duration?: number;
  };
  error?: string;
  message?: string;
}

/**
 * Generate audio from text and optionally generate captions from the audio
 * This is a complete text-to-media workflow:
 * 1. Text → Audio (TTS)
 * 2. Upload to Cloudinary (if enabled)
 * 3. Audio → Captions (if enabled)
 * 
 * @param options - Text to media conversion options
 * @returns Result with audio URL and optional captions
 */
export async function generateAudioWithCaptions(
  options: TextToMediaOptions
): Promise<TextToMediaResult> {
  try {
    const {
      text,
      language = 'en',
      gender = 'female',
      provider = 'edge',
      storage = 'cloudinary',
      generateCaptions: shouldGenerateCaptions = true,
      captionFormat = 'srt',
      speakerLabels = false,
    } = options;

    console.log('Starting text-to-media workflow...', {
      textLength: text.length,
      language,
      storage,
      generateCaptions: shouldGenerateCaptions,
    });

    // Step 1: Generate audio from text
    console.log('Step 1/2: Generating audio with TTS...');
    const audioUrl = await generateAudio({
      text,
      language,
      gender,
      provider,
      storage,
    });

    if (!audioUrl) {
      return {
        success: false,
        error: 'Failed to generate audio',
      };
    }

    console.log('✅ Audio generated successfully:', audioUrl);

    // Step 2: Generate captions from audio (if enabled)
    if (shouldGenerateCaptions && audioUrl) {
      console.log('Step 2/2: Generating captions from audio...');

      try {
        const captionResult = await generateCaptions({
          audioUrl: audioUrl,
          language,
          format: captionFormat,
          speakerLabels,
        });

        if (captionResult.success) {
          console.log('✅ Captions generated successfully');
          return {
            success: true,
            audioUrl: audioUrl,
            storage: storage,
            captions: {
              srt: captionResult.srt,
              vtt: captionResult.vtt,
              rawText: captionResult.rawText,
              transcriptId: captionResult.transcriptId,
              wordsCount: captionResult.wordsCount,
              duration: captionResult.duration,
            },
            message: 'Audio and captions generated successfully',
          };
        } else {
          // Captions failed but audio succeeded
          console.warn('⚠️ Captions generation failed, but audio is available');
          return {
            success: true,
            audioUrl: audioUrl,
            storage: storage,
            error: `Captions failed: ${captionResult.error}`,
            message: 'Audio generated, but captions failed',
          };
        }
      } catch (captionError) {
        console.error('Caption generation error:', captionError);
        return {
          success: true,
          audioUrl: audioUrl,
          storage: storage,
          error: `Captions failed: ${captionError instanceof Error ? captionError.message : 'Unknown error'}`,
          message: 'Audio generated, but captions failed',
        };
      }
    }

    // Return just audio if captions not requested
    return {
      success: true,
      audioUrl: audioUrl,
      storage: storage,
      message: 'Audio generated successfully',
    };
  } catch (error) {
    console.error('Text-to-media workflow failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Quick helper to generate audio only (no captions)
 */
export async function generateAudioOnly(
  text: string,
  language: 'en' | 'ar' | 'fr' = 'en',
  gender: 'male' | 'female' = 'female'
): Promise<TextToMediaResult> {
  return generateAudioWithCaptions({
    text,
    language,
    gender,
    generateCaptions: false,
  });
}

/**
 * Quick helper to generate audio + captions in one call
 */
export async function generateAudioAndCaptions(
  text: string,
  language: 'en' | 'ar' | 'fr' = 'en',
  gender: 'male' | 'female' = 'female'
): Promise<TextToMediaResult> {
  return generateAudioWithCaptions({
    text,
    language,
    gender,
    generateCaptions: true,
    storage: 'cloudinary',
  });
}
