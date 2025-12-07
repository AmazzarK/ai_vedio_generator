'use client';

import { useState } from 'react';

interface TextToMediaResult {
  success: boolean;
  audioUrl?: string;
  storage?: 'cloudinary' | 'local';
  captions?: {
    srt?: string;
    vtt?: string;
    rawText?: string;
    transcriptId?: string;
    wordsCount?: number;
    duration?: number;
  };
  error?: string;
  message?: string;
}

export default function TestTextToMediaPage() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState<'en' | 'ar' | 'fr'>('en');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [generateCaptions, setGenerateCaptions] = useState(true);
  const [captionFormat, setCaptionFormat] = useState<'srt' | 'vtt' | 'json'>('srt');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TextToMediaResult | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      alert('Please enter some text');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/text-to-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          language,
          gender,
          provider: 'edge',
          storage: 'cloudinary',
          generateCaptions,
          captionFormat,
          speakerLabels: false,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  const quickTests = [
    {
      label: 'English Sample',
      text: 'Welcome to our AI video generator platform. Create amazing videos with artificial intelligence in just a few clicks.',
      language: 'en' as const,
    },
    {
      label: 'Arabic Sample',
      text: 'مرحبا بكم في منصة مولد الفيديو بالذكاء الاصطناعي. أنشئ مقاطع فيديو رائعة باستخدام الذكاء الاصطناعي في بضع نقرات فقط.',
      language: 'ar' as const,
    },
    {
      label: 'French Sample',
      text: "Bienvenue sur notre plateforme de génération de vidéos par IA. Créez des vidéos étonnantes avec l'intelligence artificielle en quelques clics.",
      language: 'fr' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🎬 Text to Audio + Captions</h1>
        <p className="text-gray-600 mb-6">
          Complete workflow: Generate audio from text AND create captions automatically
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-4">
            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Text (Max 5000 characters)
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to convert to audio and captions..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={5000}
              />
              <div className="text-sm text-gray-500 mt-1">
                {text.length} / 5000 characters
              </div>
            </div>

            {/* Quick Test Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Test Samples
              </label>
              <div className="flex gap-2 flex-wrap">
                {quickTests.map((test) => (
                  <button
                    key={test.label}
                    onClick={() => {
                      setText(test.text);
                      setLanguage(test.language);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                  >
                    {test.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <div className="flex gap-4">
                {[
                  { value: 'en', label: 'English' },
                  { value: 'ar', label: 'العربية' },
                  { value: 'fr', label: 'Français' },
                ].map((lang) => (
                  <label key={lang.value} className="flex items-center">
                    <input
                      type="radio"
                      name="language"
                      value={lang.value}
                      checked={language === lang.value}
                      onChange={(e) => setLanguage(e.target.value as any)}
                      className="mr-2"
                    />
                    {lang.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice Gender
              </label>
              <div className="flex gap-4">
                {[
                  { value: 'female', label: '👩 Female' },
                  { value: 'male', label: '👨 Male' },
                ].map((g) => (
                  <label key={g.value} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={g.value}
                      checked={gender === g.value}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="mr-2"
                    />
                    {g.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Captions Toggle */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={generateCaptions}
                  onChange={(e) => setGenerateCaptions(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Generate Captions (Recommended)
                </span>
              </label>
            </div>

            {/* Caption Format */}
            {generateCaptions && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption Format
                </label>
                <div className="flex gap-4">
                  {[
                    { value: 'srt', label: 'SRT' },
                    { value: 'vtt', label: 'VTT' },
                    { value: 'json', label: 'JSON' },
                  ].map((fmt) => (
                    <label key={fmt.value} className="flex items-center">
                      <input
                        type="radio"
                        name="format"
                        value={fmt.value}
                        checked={captionFormat === fmt.value}
                        onChange={(e) => setCaptionFormat(e.target.value as any)}
                        className="mr-2"
                      />
                      {fmt.label}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !text.trim()}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading
                ? generateCaptions
                  ? '🎙️ Generating Audio & Captions...'
                  : '🎙️ Generating Audio...'
                : generateCaptions
                ? '✨ Generate Audio + Captions'
                : '✨ Generate Audio Only'}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {result.success ? '✅ Success!' : '❌ Error'}
            </h2>

            {result.success ? (
              <div className="space-y-4">
                {/* Audio Player */}
                <div>
                  <h3 className="font-semibold mb-2">🎙️ Generated Audio</h3>
                  {result.audioUrl && (
                    <div className="space-y-2">
                      <audio controls src={result.audioUrl} className="w-full" />
                      <div className="flex gap-2">
                        <a
                          href={result.audioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                        >
                          Open Audio URL
                        </a>
                        <button
                          onClick={() => navigator.clipboard.writeText(result.audioUrl!)}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm"
                        >
                          Copy URL
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded break-all">
                        {result.audioUrl}
                      </div>
                    </div>
                  )}
                </div>

                {/* Captions */}
                {result.captions && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm text-gray-600">Words</div>
                        <div className="text-lg font-bold">{result.captions.wordsCount}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="text-lg font-bold">{result.captions.duration?.toFixed(1)}s</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Storage</div>
                        <div className="text-lg font-bold">{result.storage}</div>
                      </div>
                    </div>

                    {/* Raw Transcript */}
                    {result.captions.rawText && (
                      <div>
                        <h3 className="font-semibold mb-2">📝 Transcript</h3>
                        <div className="p-4 bg-gray-50 rounded-lg text-sm">
                          {result.captions.rawText}
                        </div>
                      </div>
                    )}

                    {/* SRT Captions */}
                    {result.captions.srt && (
                      <div>
                        <h3 className="font-semibold mb-2">📄 SRT Captions</h3>
                        <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-xs overflow-x-auto max-h-60">
                          {result.captions.srt}
                        </pre>
                        <button
                          onClick={() => {
                            const blob = new Blob([result.captions!.srt!], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'captions.srt';
                            a.click();
                          }}
                          className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                        >
                          Download SRT
                        </button>
                      </div>
                    )}

                    {/* VTT Captions */}
                    {result.captions.vtt && (
                      <div>
                        <h3 className="font-semibold mb-2">📄 VTT Captions</h3>
                        <pre className="p-4 bg-gray-900 text-blue-400 rounded-lg text-xs overflow-x-auto max-h-60">
                          {result.captions.vtt}
                        </pre>
                        <button
                          onClick={() => {
                            const blob = new Blob([result.captions!.vtt!], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'captions.vtt';
                            a.click();
                          }}
                          className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                        >
                          Download VTT
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {result.message && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
                    {result.message}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <p className="font-semibold">Error:</p>
                <p>{result.error}</p>
              </div>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 bg-linear-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">✨ Complete Workflow</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>1️⃣ Enter text in any language (English, Arabic, French)</li>
            <li>2️⃣ Select voice gender and language</li>
            <li>3️⃣ Generate audio with Edge TTS (FREE, high quality)</li>
            <li>4️⃣ Upload to Cloudinary automatically (25 GB FREE)</li>
            <li>5️⃣ Generate captions with AssemblyAI ($50 FREE credits)</li>
            <li>6️⃣ Download SRT/VTT files for video editing</li>
          </ul>
          <div className="mt-3 text-xs text-blue-600">
            💡 This is the complete pipeline: Text → Audio → Captions → Ready for Video!
          </div>
        </div>
      </div>
    </div>
  );
}
