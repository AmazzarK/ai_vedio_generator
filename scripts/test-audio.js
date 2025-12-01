// Test Edge TTS Audio Generation
// Run this with: node scripts/test-audio.js

const { generateAudio } = require('../lib/text-to-speech');

async function testAudioGeneration() {
  console.log('🎙️ Testing Edge TTS Audio Generation...\n');

  const tests = [
    {
      text: 'Hello! This is a test of the Edge TTS audio generation system.',
      language: 'en',
      gender: 'female',
      provider: 'edge'
    },
    {
      text: 'مرحبا بكم في اختبار تحويل النص إلى كلام',
      language: 'ar',
      gender: 'female',
      provider: 'edge'
    },
    {
      text: 'Bonjour! Ceci est un test de génération audio.',
      language: 'fr',
      gender: 'male',
      provider: 'edge'
    }
  ];

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    console.log(`\n📝 Test ${i + 1}: ${test.language.toUpperCase()} - ${test.gender}`);
    console.log(`Text: ${test.text}`);
    
    try {
      const audioUrl = await generateAudio(test);
      console.log(`✅ Success! Audio URL: ${audioUrl}`);
    } catch (error) {
      console.error(`❌ Failed: ${error.message}`);
    }
  }

  console.log('\n✅ All tests completed!');
}

testAudioGeneration();
