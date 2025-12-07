// Quick test script to verify Gemini API key and find working models
const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = 'AIzaSyApulVTL0e2duulD3_pmeGE9j0jQ_1E70M';

async function testGeminiAPI() {
  console.log('🧪 Testing Gemini API...\n');
  
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Try different model names - updated list for your API key
    const modelsToTry = [
      'models/gemini-pro',  // Try with models/ prefix
      'models/gemini-1.5-flash',
      'models/gemini-1.5-pro',
      'gemini-pro',  // Without prefix
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-1.0-pro',
      'gemini-1.0-pro-001',
    ];
    
    for (const modelName of modelsToTry) {
      console.log(`\n🔍 Testing model: ${modelName}`);
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContent({
          contents: [{
            role: 'user',
            parts: [{ text: 'Say hello in one word' }]
          }]
        });
        
        const response = result.response;
        const text = response.text();
        
        console.log(`✅ SUCCESS with ${modelName}`);
        console.log(`   Response: ${text}`);
        console.log(`   ⭐ USE THIS MODEL: "${modelName}"`);
        return; // Stop at first working model
        
      } catch (error) {
        console.log(`❌ Failed: ${error.message}`);
      }
    }
    
    console.log('\n❌ None of the models worked!');
    console.log('\n📝 Possible issues:');
    console.log('1. API key might be invalid or expired');
    console.log('2. API key might not have Gemini API enabled');
    console.log('3. Billing might not be set up');
    console.log('\n🔗 Check your API key at: https://makersuite.google.com/app/apikey');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n🔗 Get a new API key at: https://makersuite.google.com/app/apikey');
  }
}

testGeminiAPI();
