// OPTION 1: Using stable @google/generative-ai SDK with gemini-pro
// This is what's currently working in your app

import { GoogleGenerativeAI } from '@google/generative-ai';

async function main() {
  // Use your actual API key
  const API_KEY = 'AIzaSyDEHs5FhAywu0hvCAuSKxHin0NxakDZcik';
  
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Use gemini-pro - stable, reliable, 60 RPM free tier
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-pro'
  });

  const prompt = `You are an expert video content creator. Generate a complete video plan for a 30s video.

User Request: Create a cinematic video about AI technology and its impact on the future
Platform: youtube
Video Style: Cinematic
Number of Scenes: 5
Language: en

IMPORTANT: You MUST respond in valid JSON format with this EXACT structure:

{
  "script": "The complete narration script as one continuous text",
  "scenes": [
    {
      "sceneNumber": 1,
      "duration": 6,
      "imagePrompt": "Detailed image generation prompt for this scene (be very descriptive for AI image generation)",
      "narration": "What is said during this scene"
    }
  ]
}

Requirements:
1. The script field contains the FULL narration text
2. Each scene has a detailed imagePrompt suitable for AI image generation (include style, composition, lighting, mood)
3. The narration for each scene
4. Scene durations should add up to approximately 30s
5. Image prompts should be highly detailed and specific for Cinematic style
6. Do NOT include any markdown, code blocks, or explanations - ONLY the JSON object

Example image prompt: "A cinematic wide-angle shot of a modern office workspace, professional lighting, bokeh background, highly detailed, photorealistic, 4k quality"`;

  const result = await model.generateContent({
    contents: [{
      role: 'user',
      parts: [{ text: prompt }]
    }]
  });

  const response = result.response;
  const text = response.text();
  
  console.log('✅ Gemini Pro Response:');
  console.log(text);
}

main().catch(console.error);
