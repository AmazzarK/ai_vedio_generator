import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

/**
 * @deprecated Use /api/generate-video instead
 * This route is kept for backward compatibility
 */
export async function POST(req: Request) {
  try {
    // Validate API key
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      console.error('❌ HUGGINGFACE_API_KEY not configured');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const data = await req.json();
    
    // Validate request body
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const hf = new HfInference(apiKey);
    
    const response = await hf.chatCompletion({
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
      messages: [{ role: 'user', content: JSON.stringify(data) }],
      max_tokens: 2000,
    });

    // Validate response
    if (!response.choices || !response.choices[0]) {
      throw new Error('Invalid response from Hugging Face API');
    }

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Empty response from API');
    }

    return NextResponse.json({
      success: true,
      script: content,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('❌ Video script generation error:', errorMessage, error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate script',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
