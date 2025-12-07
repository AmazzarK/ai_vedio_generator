'use client';

import { useState } from 'react';

interface CaptionResult {
  success: boolean;
  captions?: Array<{
    text: string;
    start: number;
    end: number;
    speaker?: string;
  }>;
  srt?: string;
  vtt?: string;
  rawText?: string;
  transcriptId?: string;
  wordsCount?: number;
  duration?: number;
  error?: string;
}

export default function TestCaptionsPage() {
  const [audioUrl, setAudioUrl] = useState('');
  const [language, setLanguage] = useState<'en' | 'ar' | 'fr' | 'auto'>('auto');
  const [format, setFormat] = useState<'srt' | 'vtt' | 'json'>('srt');
  const [speakerLabels, setSpeakerLabels] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CaptionResult | null>(null);

  const handleGenerateCaptions = async () => {
    if (!audioUrl.trim()) {
      alert('Please enter an audio URL');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/generate-captions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audioUrl,
          language,
          format,
          speakerLabels,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error generating captions:', error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  const quickTestUrls = [
    {
      label: 'Sample Audio 1',
      url: 'https://github.com/AssemblyAI-Examples/audio-examples/raw/main/20230607_me_canadian_wildfires.mp3',
    },
    {
      label: 'Sample Audio 2',
      url: 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Test Caption Generation</h1>
        <p className="text-gray-600 mb-6">
          Generate captions from audio files using AssemblyAI
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-4">
            {/* Audio URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Audio URL (Cloudinary or Public URL)
              </label>
              <input
                type="text"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                placeholder="https://res.cloudinary.com/your-cloud/audio/file.mp3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Quick Test Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Test URLs
              </label>
              <div className="flex gap-2">
                {quickTestUrls.map((test) => (
                  <button
                    key={test.label}
                    onClick={() => setAudioUrl(test.url)}
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
                  { value: 'auto', label: 'Auto-Detect' },
                  { value: 'en', label: 'English' },
                  { value: 'ar', label: 'Arabic' },
                  { value: 'fr', label: 'French' },
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

            {/* Format Selection */}
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
                      checked={format === fmt.value}
                      onChange={(e) => setFormat(e.target.value as any)}
                      className="mr-2"
                    />
                    {fmt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Speaker Labels */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={speakerLabels}
                  onChange={(e) => setSpeakerLabels(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable Speaker Labels (identify different speakers)
                </span>
              </label>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateCaptions}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Generating Captions...' : 'Generate Captions'}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {result.success ? '✅ Captions Generated' : '❌ Error'}
            </h2>

            {result.success ? (
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Words</div>
                    <div className="text-lg font-bold">{result.wordsCount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="text-lg font-bold">{result.duration?.toFixed(1)}s</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Transcript ID</div>
                    <div className="text-xs font-mono">{result.transcriptId?.slice(0, 12)}...</div>
                  </div>
                </div>

                {/* Raw Text */}
                <div>
                  <h3 className="font-semibold mb-2">Raw Transcript</h3>
                  <div className="p-4 bg-gray-50 rounded-lg text-sm">
                    {result.rawText}
                  </div>
                </div>

                {/* SRT Captions */}
                {result.srt && (
                  <div>
                    <h3 className="font-semibold mb-2">SRT Format</h3>
                    <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-xs overflow-x-auto max-h-60">
                      {result.srt}
                    </pre>
                    <button
                      onClick={() => {
                        const blob = new Blob([result.srt!], { type: 'text/plain' });
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
                {result.vtt && (
                  <div>
                    <h3 className="font-semibold mb-2">VTT Format</h3>
                    <pre className="p-4 bg-gray-900 text-blue-400 rounded-lg text-xs overflow-x-auto max-h-60">
                      {result.vtt}
                    </pre>
                    <button
                      onClick={() => {
                        const blob = new Blob([result.vtt!], { type: 'text/plain' });
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
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <p className="font-semibold">Error:</p>
                <p>{result.error}</p>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📝 Instructions</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>1. Generate audio first at /test-audio (this saves to Cloudinary)</li>
            <li>2. Copy the Cloudinary audio URL</li>
            <li>3. Paste it here and generate captions</li>
            <li>4. Download SRT or VTT files for video editing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
