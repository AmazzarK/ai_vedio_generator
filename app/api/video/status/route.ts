import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { Videos } from '@/configs/schema';
import { eq } from 'drizzle-orm';

/**
 * GET /api/video/status/:videoId
 * Check the status of a video generation
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  try {
    // Authenticate user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { videoId } = await params;

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    // Get video from database
    const video = await db
      .select()
      .from(Videos)
      .where(eq(Videos.id, parseInt(videoId)))
      .then(rows => rows[0]);

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Verify ownership
    if (video.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized: You do not own this video' },
        { status: 403 }
      );
    }

    // Return video status
    return NextResponse.json({
      success: true,
      videoId: video.id,
      title: video.title,
      status: video.status || 'processing',
      progress: {
        step: getProgressStep(video.status || 'processing'),
        message: getProgressMessage(video.status || 'processing'),
      },
      audioUrl: video.audioUrl || null,
      videoUrl: video.videoUrl || null,
      thumbnailUrl: video.thumbnailUrl || null,
      completedAt: video.completedAt,
      createdAt: video.createdAt,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Video status check error:', errorMessage, error);

    return NextResponse.json(
      {
        error: 'Failed to check video status',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * Get progress step from status
 */
function getProgressStep(status: string): number {
  const steps: Record<string, number> = {
    'processing': 2,
    'completed': 5,
    'failed': -1,
  };
  return steps[status] || 1;
}

/**
 * Get human-readable progress message
 */
function getProgressMessage(status: string): string {
  const messages: Record<string, string> = {
    'processing': 'Your video is being generated. This may take a few minutes...',
    'completed': 'Your video is ready! Check your dashboard.',
    'failed': 'Video generation failed. Please try again.',
  };
  return messages[status] || 'Processing...';
}
