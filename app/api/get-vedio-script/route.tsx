import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { prompt, videoStyle, videoLength, platform } = await req.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required to generate video script' },
        { status: 400 }
      )
    }

    // Initialize Gemini AI
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    })

    const model = 'gemini-2.0-flash-exp'

    // Create detailed prompt for video script generation
    const systemPrompt = `You are an expert video script writer specializing in social media content. 
Generate a detailed, engaging video script based on the following requirements:

Platform: ${platform || 'General'}
Video Style: ${videoStyle || 'Cinematic'}
Video Length: ${videoLength || '30s'}
User Request: ${prompt}

Please provide a comprehensive video script that includes:
1. Opening Hook (first 3 seconds)
2. Main Content with scene descriptions
3. Visual elements and transitions
4. Audio/Music suggestions
5. Text overlays and captions
6. Call-to-action (if applicable)
7. Timing breakdown for each scene

Format the response in a structured way that's easy to follow for video production.`

    const contents = [
      {
        role: 'user' as const,
        parts: [
          {
            text: systemPrompt,
          },
        ],
      },
    ]

    // Generate the script
    const response = await ai.models.generateContent({
      model,
      contents,
    })

    const script = response.text

    return NextResponse.json({
      success: true,
      script: script,
      metadata: {
        platform,
        videoStyle,
        videoLength,
      },
    })
  } catch (error: any) {
    console.error('Error generating video script:', error)
    return NextResponse.json(
      { error: 'Failed to generate video script', details: error.message },
      { status: 500 }
    )
  }
}
