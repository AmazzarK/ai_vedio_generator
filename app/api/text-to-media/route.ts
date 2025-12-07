import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { generateAudioWithCaptions } from '@/lib/text-to-media';

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
    const {
      text,
      language,
      gender,
      provider,
      storage,
      generateCaptions,
      captionFormat,
      speakerLabels,
    } = body;

    // Validate text
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required and cannot be empty' },
        { status: 400 }
      );
    }

    // Validate text length
    if (text.length > 5000) {
      return NextResponse.json(
        { error: 'Text is too long. Maximum 5000 characters.' },
        { status: 400 }
      );
    }

    // Validate language
    const validLanguages = ['en', 'ar', 'fr'];
    if (language && !validLanguages.includes(language)) {
      return NextResponse.json(
        { error: `Invalid language. Must be one of: ${validLanguages.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate gender
    const validGenders = ['male', 'female'];
    if (gender && !validGenders.includes(gender)) {
      return NextResponse.json(
        { error: `Invalid gender. Must be one of: ${validGenders.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate provider
    const validProviders = ['edge', 'gtts'];
    if (provider && !validProviders.includes(provider)) {
      return NextResponse.json(
        { error: `Invalid provider. Must be one of: ${validProviders.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate storage
    const validStorages = ['local', 'cloudinary'];
    if (storage && !validStorages.includes(storage)) {
      return NextResponse.json(
        { error: `Invalid storage. Must be one of: ${validStorages.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate caption format
    const validFormats = ['srt', 'vtt', 'json'];
    if (captionFormat && !validFormats.includes(captionFormat)) {
      return NextResponse.json(
        { error: `Invalid caption format. Must be one of: ${validFormats.join(', ')}` },
        { status: 400 }
      );
    }

    console.log('Generating audio and captions for user:', userId, {
      textLength: text.length,
      language: language || 'en',
      generateCaptions: generateCaptions !== false,
    });

    // Generate audio and optionally captions
    const result = await generateAudioWithCaptions({
      text,
      language: language || 'en',
      gender: gender || 'female',
      provider: provider || 'edge',
      storage: storage || 'cloudinary',
      generateCaptions: generateCaptions !== false, // Default to true
      captionFormat: captionFormat || 'srt',
      speakerLabels: speakerLabels || false,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Generation failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      audioUrl: result.audioUrl,
      storage: result.storage,
      captions: result.captions,
      message: result.message,
    });
  } catch (error) {
    console.error('Text-to-media API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate audio and captions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
