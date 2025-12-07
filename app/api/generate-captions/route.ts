import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { generateCaptions } from '@/lib/assemblyai-captions';

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { audioUrl, language, format, speakerLabels } = body;

    // Validate audio URL
    if (!audioUrl || typeof audioUrl !== 'string') {
      return NextResponse.json(
        { error: 'Audio URL is required' },
        { status: 400 }
      );
    }

    // Validate language
    const validLanguages = ['en', 'ar', 'fr', 'auto'];
    if (language && !validLanguages.includes(language)) {
      return NextResponse.json(
        { error: `Invalid language. Must be one of: ${validLanguages.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate format
    const validFormats = ['srt', 'vtt', 'json'];
    if (format && !validFormats.includes(format)) {
      return NextResponse.json(
        { error: `Invalid format. Must be one of: ${validFormats.join(', ')}` },
        { status: 400 }
      );
    }

    console.log('Generating captions for user:', userId, { audioUrl, language, format });

    // Generate captions
    const result = await generateCaptions({
      audioUrl,
      language: language || 'auto',
      format: format || 'srt',
      speakerLabels: speakerLabels || false,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Caption generation failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      captions: result.captions,
      srt: result.srt,
      vtt: result.vtt,
      rawText: result.rawText,
      transcriptId: result.transcriptId,
      wordsCount: result.wordsCount,
      duration: result.duration,
      message: 'Captions generated successfully',
    });
  } catch (error) {
    console.error('Caption generation API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate captions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
