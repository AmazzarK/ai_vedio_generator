import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

export interface VoiceOptions {
  language: 'en' | 'ar' | 'fr';
  gender?: 'male' | 'female';
}

const voices = {
  en: {
    male: 'en-US-GuyNeural',
    female: 'en-US-JennyNeural'
  },
  ar: {
    male: 'ar-SA-HamedNeural',
    female: 'ar-SA-ZariyahNeural'
  },
  fr: {
    male: 'fr-FR-HenriNeural',
    female: 'fr-FR-DeniseNeural'
  }
};

export async function generateAudioEdgeTTS(
  text: string,
  options: VoiceOptions = { language: 'en', gender: 'female' }
): Promise<string> {
  try {
    // Create audio directory if it doesn't exist
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    const fileName = `${Date.now()}.mp3`;
    const outputPath = path.join(audioDir, fileName);
    
    const voice = voices[options.language][options.gender || 'female'];

    // Use edge-tts command
    const command = `npx edge-tts --voice "${voice}" --text "${text.replace(/"/g, '\\"')}" --write-media "${outputPath}"`;
    
    console.log('Generating audio with Edge TTS...');
    await execAsync(command);
    console.log('Audio generated successfully:', fileName);

    return `/audio/${fileName}`;
  } catch (error) {
    console.error('Edge TTS error:', error);
    throw new Error('Failed to generate audio with Edge TTS');
  }
}
