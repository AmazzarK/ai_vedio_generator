import { NextResponse, NextRequest } from 'next/server';
import { generateAudio } from '@/lib/text-to-speech';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { text, language, gender, provider, storage } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Generate audio (will auto-upload to Cloudinary if configured)
    const audioUrl = await generateAudio({
      text,
      language: language || 'en',
      gender: gender || 'female',
      provider: provider || 'edge',
      storage: storage || 'cloudinary' // Default to Cloudinary storage
    });

    return NextResponse.json({
      success: true,
      audioUrl,
      storage: audioUrl.startsWith('http') ? 'cloudinary' : 'local',
      message: 'Audio generated successfully'
    });

  } catch (error) {
    console.error('Audio generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate audio' },
      { status: 500 }
    );
  }
}
