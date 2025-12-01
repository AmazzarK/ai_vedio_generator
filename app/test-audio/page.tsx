'use client';

import { useState } from 'react';

export default function AudioGeneratorTest() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState<'en' | 'ar' | 'fr'>('en');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const generateAudio = async () => {
    setLoading(true);
    setAudioUrl(null);

    try {
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          language,
          gender,
          provider: 'edge'
        })
      });

      const data = await response.json();

      if (data.success) {
        setAudioUrl(data.audioUrl);
      } else {
        alert('Failed to generate audio: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate audio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">🎙️ Test Audio Generation</h2>
        <p className="text-gray-600 mb-6">
          Test Edge TTS text-to-speech with multiple languages and voices
        </p>
      </div>

      {/* Text Input */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Text to Convert
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          className="w-full p-3 border rounded-lg resize-none"
          rows={4}
        />
      </div>

      {/* Language Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'ar' | 'fr')}
          className="w-full p-3 border rounded-lg"
        >
          <option value="en">English (English)</option>
          <option value="ar">Arabic (العربية)</option>
          <option value="fr">French (Français)</option>
        </select>
      </div>

      {/* Gender Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Voice</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value as 'female')}
            />
            Female
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value as 'male')}
            />
            Male
          </label>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateAudio}
        disabled={!text || loading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Generating...' : 'Generate Audio'}
      </button>

      {/* Audio Player */}
      {audioUrl && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-medium text-green-800 mb-2">
            ✅ Audio Generated Successfully!
          </p>
          <audio controls className="w-full" src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
          <p className="text-xs text-gray-500 mt-2">URL: {audioUrl}</p>
        </div>
      )}

      {/* Quick Test Examples */}
      <div className="border-t pt-6">
        <h3 className="font-semibold mb-3">Quick Test Examples:</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setText('Hello! This is a test of Edge TTS audio generation.');
              setLanguage('en');
              setGender('female');
            }}
            className="w-full text-left p-3 border rounded-lg hover:bg-gray-50"
          >
            <div className="font-medium">English Test</div>
            <div className="text-sm text-gray-500">Female voice</div>
          </button>
          <button
            onClick={() => {
              setText('مرحبا بكم في اختبار تحويل النص إلى كلام باللغة العربية');
              setLanguage('ar');
              setGender('female');
            }}
            className="w-full text-left p-3 border rounded-lg hover:bg-gray-50"
          >
            <div className="font-medium">Arabic Test (اختبار عربي)</div>
            <div className="text-sm text-gray-500">Female voice</div>
          </button>
          <button
            onClick={() => {
              setText('Bonjour! Ceci est un test de génération audio en français.');
              setLanguage('fr');
              setGender('male');
            }}
            className="w-full text-left p-3 border rounded-lg hover:bg-gray-50"
          >
            <div className="font-medium">French Test (Test français)</div>
            <div className="text-sm text-gray-500">Male voice</div>
          </button>
        </div>
      </div>
    </div>
  );
}
