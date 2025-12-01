import fs from 'fs';
import path from 'path';

// @ts-ignore - gTTS doesn't have TypeScript types
import gtts from 'gtts';

export async function generateAudioGTTS(
  text: string,
  language: 'en' | 'ar' | 'fr' = 'en'
): Promise<string> {
  return new Promise((resolve, reject) => {
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    const fileName = `${Date.now()}.mp3`;
    const outputPath = path.join(audioDir, fileName);

    const speech = new gtts(text, language);
    
    console.log('Generating audio with gTTS...');
    speech.save(outputPath, (err: Error | null) => {
      if (err) {
        console.error('gTTS error:', err);
        reject(err);
      } else {
        console.log('Audio generated successfully:', fileName);
        resolve(`/audio/${fileName}`);
      }
    });
  });
}
