import { generateAudioEdgeTTS, VoiceOptions } from './edge-tts';
import { generateAudioGTTS } from './gtts';
import { uploadAudioToCloudinary } from './cloudinary-storage';
import path from 'path';

export type TTSProvider = 'edge' | 'gtts';
export type StorageType = 'local' | 'cloudinary';

export interface TextToSpeechOptions {
  text: string;
  language: 'en' | 'ar' | 'fr';
  gender?: 'male' | 'female';
  provider?: TTSProvider;
  storage?: StorageType; // 'local' or 'cloudinary'
}

export async function generateAudio(options: TextToSpeechOptions): Promise<string> {
  const { text, language, gender = 'female', provider = 'edge', storage = 'cloudinary' } = options;

  try {
    let localAudioPath: string;

    // Step 1: Generate audio locally
    if (provider === 'edge') {
      console.log('🎙️ Using Edge TTS...');
      localAudioPath = await generateAudioEdgeTTS(text, { language, gender });
    } else {
      console.log('🎙️ Using gTTS...');
      localAudioPath = await generateAudioGTTS(text, language);
    }

    // Step 2: Upload to Cloudinary if enabled
    if (storage === 'cloudinary') {
      console.log('☁️ Uploading to Cloudinary...');
      const localFilePath = path.join(process.cwd(), 'public', localAudioPath);
      const uploadResult = await uploadAudioToCloudinary(localFilePath);

      if (uploadResult.success && uploadResult.url) {
        console.log('✅ Audio uploaded to Cloudinary:', uploadResult.url);
        return uploadResult.url;
      } else {
        console.warn('⚠️ Cloudinary upload failed, using local storage:', uploadResult.error);
        return localAudioPath;
      }
    }

    // Return local path if Cloudinary is disabled
    return localAudioPath;

  } catch (error) {
    console.error(`${provider} TTS failed, trying fallback...`, error);
    
    // Fallback to gTTS if edge-tts fails
    if (provider === 'edge') {
      console.log('🔄 Falling back to gTTS...');
      const localAudioPath = await generateAudioGTTS(text, language);
      
      // Try Cloudinary upload for fallback too
      if (storage === 'cloudinary') {
        const localFilePath = path.join(process.cwd(), 'public', localAudioPath);
        const uploadResult = await uploadAudioToCloudinary(localFilePath);
        if (uploadResult.success && uploadResult.url) {
          return uploadResult.url;
        }
      }
      
      return localAudioPath;
    }
    
    throw error;
  }
}
