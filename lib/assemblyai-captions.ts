import { AssemblyAI } from 'assemblyai';

// Initialize AssemblyAI client
const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY || '',
});

export interface CaptionOptions {
  audioUrl: string;
  language?: 'en' | 'ar' | 'fr' | 'auto'; // Support your TTS languages
  format?: 'srt' | 'vtt' | 'json'; // Caption formats
  speakerLabels?: boolean; // Enable speaker diarization
}

export interface Caption {
  text: string;
  start: number; // milliseconds
  end: number; // milliseconds
  speaker?: string;
}

export interface CaptionResult {
  success: boolean;
  captions?: Caption[];
  srt?: string;
  vtt?: string;
  rawText?: string;
  error?: string;
  transcriptId?: string;
  wordsCount?: number;
  duration?: number; // seconds
}

/**
 * Generate captions from audio file using AssemblyAI
 * @param options - Caption generation options
 * @returns Caption result with multiple formats
 */
export async function generateCaptions(
  options: CaptionOptions
): Promise<CaptionResult> {
  try {
    const { audioUrl, language = 'auto', format = 'srt', speakerLabels = false } = options;

    // Validate API key
    if (!process.env.ASSEMBLYAI_API_KEY) {
      throw new Error('ASSEMBLYAI_API_KEY is not configured');
    }

    console.log('Starting transcription with AssemblyAI...', { audioUrl, language });

    // Configure transcription parameters
    const config: any = {
      audio: audioUrl,
      speaker_labels: speakerLabels,
    };

    // Set language (auto-detect if not specified)
    if (language !== 'auto') {
      config.language_code = language;
    } else {
      config.language_detection = true;
    }

    // Start transcription
    const transcript = await client.transcripts.transcribe(config);

    // Check for errors
    if (transcript.status === 'error') {
      throw new Error(`Transcription failed: ${transcript.error}`);
    }

    // Extract captions from words with timestamps
    const captions: Caption[] = [];
    if (transcript.words && transcript.words.length > 0) {
      transcript.words.forEach((word) => {
        captions.push({
          text: word.text,
          start: word.start,
          end: word.end,
          speaker: word.speaker || undefined,
        });
      });
    }

    // Generate SRT format
    const srt = await generateSRT(transcript);

    // Generate VTT format
    const vtt = await generateVTT(transcript);

    // Calculate duration in seconds
    const duration = transcript.audio_duration || 0;

    return {
      success: true,
      captions,
      srt,
      vtt,
      rawText: transcript.text || undefined,
      transcriptId: transcript.id,
      wordsCount: transcript.words?.length || 0,
      duration,
    };
  } catch (error) {
    console.error('AssemblyAI caption generation failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generate SRT format captions
 */
async function generateSRT(transcript: any): Promise<string> {
  try {
    const srt = await transcript.srt();
    return srt || '';
  } catch (error) {
    console.error('SRT generation failed:', error);
    return '';
  }
}

/**
 * Generate VTT format captions
 */
async function generateVTT(transcript: any): Promise<string> {
  try {
    const vtt = await transcript.vtt();
    return vtt || '';
  } catch (error) {
    console.error('VTT generation failed:', error);
    return '';
  }
}

/**
 * Format milliseconds to SRT timestamp (HH:MM:SS,mmm)
 */
export function formatSRTTimestamp(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${String(milliseconds).padStart(3, '0')}`;
}

/**
 * Format milliseconds to VTT timestamp (HH:MM:SS.mmm)
 */
export function formatVTTTimestamp(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

/**
 * Check AssemblyAI account usage and remaining credits
 */
export async function checkUsage(): Promise<any> {
  try {
    // Note: AssemblyAI doesn't have a direct usage endpoint in the SDK
    // You need to check your dashboard: https://www.assemblyai.com/dashboard
    return {
      message: 'Check your usage at: https://www.assemblyai.com/dashboard',
    };
  } catch (error) {
    console.error('Failed to check usage:', error);
    return { error: 'Failed to check usage' };
  }
}
