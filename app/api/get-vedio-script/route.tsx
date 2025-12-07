import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || '');
    
    const response = await hf.chatCompletion({
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
      messages: [{ role: 'user', content: JSON.stringify(data) }],
      max_tokens: 2000,
    });

    return NextResponse.json({
      success: true,
      script: response.choices[0]?.message?.content || '',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
