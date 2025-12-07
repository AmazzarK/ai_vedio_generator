import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { generateCompleteVideo } from '@/lib/complete-video-workflow';

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
      userPrompt,
      platform,
      videoStyle,
      videoLength,
      language,
      voiceGender,
      imageModel,
    } = body;

    // Validate user prompt
    if (!userPrompt || typeof userPrompt !== 'string' || userPrompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'User prompt is required' },
        { status: 400 }
      );
    }

    // Validate video length
    const validLengths = ['15s', '30s', '60s'];
    if (videoLength && !validLengths.includes(videoLength)) {
      return NextResponse.json(
        { error: `Invalid video length. Must be one of: ${validLengths.join(', ')}` },
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

    // Validate voice gender
    const validGenders = ['male', 'female'];
    if (voiceGender && !validGenders.includes(voiceGender)) {
      return NextResponse.json(
        { error: `Invalid voice gender. Must be one of: ${validGenders.join(', ')}` },
        { status: 400 }
      );
    }

    console.log('🎬 Starting complete video generation for user:', userId, {
      userPrompt,
      videoLength: videoLength || '30s',
      language: language || 'en',
    });

    // Generate complete video
    const result = await generateCompleteVideo({
      userPrompt,
      platform: platform || 'YouTube',
      videoStyle: videoStyle || 'Cinematic',
      videoLength: videoLength || '30s',
      language: language || 'en',
      voiceGender: voiceGender || 'female',
      imageModel,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Video generation failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      videoId: `video_${Date.now()}`,
      script: result.script,
      scenes: result.scenes,
      audioUrl: result.audioUrl,
      captions: result.captions,
      images: result.images,
      message: result.message,
      metadata: {
        userId,
        platform: platform || 'YouTube',
        videoStyle: videoStyle || 'Cinematic',
        videoLength: videoLength || '30s',
        language: language || 'en',
        voiceGender: voiceGender || 'female',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('❌ Complete video generation API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate video',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
