// To run this code you need to install the following dependencies:
// npm install @huggingface/inference

import { HfInference } from '@huggingface/inference';

async function main() {
  const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || '');
  
  // Use Meta Llama 3.1 for text generation
  const response = await hf.chatCompletion({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
    messages: [
      {
        role: "user",
        content: `INSERT_INPUT_HERE`
      }
    ],
    max_tokens: 500,
    temperature: 0.7,
  });
  
  const generatedText = response.choices[0]?.message?.content || '';
  console.log(generatedText);
}

main();
