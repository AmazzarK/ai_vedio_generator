'use client'

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Video, 
  Plus, 
  Library, 
  Settings, 
  Sparkles,
  Coins,
  Crown,
  PlayCircle,
  Smartphone,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
  Film,
  Image as ImageIcon,
  Upload,
  X,
  Languages,
  Loader2,
  CheckCircle,
  AlertCircle,
  Music,
  FileText,
  ImagePlus
} from 'lucide-react';

export default function Dashboard() {
  const pathname = usePathname();
  const [tokens, setTokens] = useState(250);
  const [selectedPlatform, setSelectedPlatform] = useState('youtube');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'fr'>('en');
  const [userPrompt, setUserPrompt] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('30s');
  const [selectedVoiceGender, setSelectedVoiceGender] = useState<'male' | 'female'>('female');
  
  // Video generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({
    step: 0,
    message: '',
    script: '',
    audioUrl: '',
    captions: { srt: '', vtt: '' },
    images: [] as string[],
    error: ''
  });
  const [showResults, setShowResults] = useState(false);

  // Navigation items
  const navItems = [
    { name: 'Generate', icon: Plus, href: '/dashboard' },
    { name: 'My Videos', icon: Library, href: '/dashboard/videos' },
    { name: 'AI Studio', icon: Sparkles, href: '/dashboard/studio' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  // Social Media Platforms with their specs
  const platforms = [
    { 
      id: 'youtube', 
      name: 'YouTube (16:9)', 
      icon: Youtube,
      aspectRatio: '16:9',
      description: 'Landscape videos, tutorials, vlogs',
      durations: ['30s', '60s', '3min', '5min', '10min'],
      maxDuration: 'Unlimited'
    },
    { 
      id: 'youtube-shorts', 
      name: 'YouTube Shorts (9:16)', 
      icon: Smartphone,
      aspectRatio: '9:16',
      description: 'Vertical short-form content',
      durations: ['15s', '30s', '60s'],
      maxDuration: '60s'
    },
    { 
      id: 'tiktok', 
      name: 'TikTok (9:16)', 
      icon: Video,
      aspectRatio: '9:16',
      description: 'Viral short videos, trends',
      durations: ['15s', '30s', '60s'],
      maxDuration: '10min'
    },
    { 
      id: 'instagram', 
      name: 'Instagram (1:1)', 
      icon: Instagram,
      aspectRatio: '1:1',
      description: 'Square feed posts',
      durations: ['15s', '30s', '60s'],
      maxDuration: '60s'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn (16:9)', 
      icon: Linkedin,
      aspectRatio: '16:9',
      description: 'Professional content',
      durations: ['30s', '1min', '3min', '5min'],
      maxDuration: '10min'
    },
    { 
      id: 'twitter', 
      name: 'Twitter/X (16:9)', 
      icon: Twitter,
      aspectRatio: '16:9',
      description: 'Quick updates, news',
      durations: ['30s', '1min', '2min'],
      maxDuration: '2min 20s'
    },
  ];

  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);

  // Generate complete video
  const handleGenerateVideo = async () => {
    if (!userPrompt.trim()) {
      alert('Please enter a video prompt!');
      return;
    }

    if (tokens < 20) {
      alert('Not enough tokens! Watch an ad or upgrade to Pro.');
      return;
    }

    setIsGenerating(true);
    setShowResults(false);
    setGenerationProgress({
      step: 0,
      message: 'Initializing video generation...',
      script: '',
      audioUrl: '',
      captions: { srt: '', vtt: '' },
      images: [],
      error: ''
    });

    try {
      // Step 1: Starting generation
      setGenerationProgress(prev => ({
        ...prev,
        step: 1,
        message: 'Generating script and scene descriptions with AI...'
      }));

      // Call the API
      const response = await fetch('/api/generate-complete-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt,
          videoLength: selectedDuration,
          platform: selectedPlatform,
          videoStyle: selectedStyle || 'Cinematic',
          language: selectedLanguage,
          voiceGender: selectedVoiceGender
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate video');
      }

      if (!data.success) {
        throw new Error(data.error || 'Video generation failed');
      }

      // Step 2: Script generated
      setGenerationProgress(prev => ({
        ...prev,
        step: 2,
        message: 'Script generated! Now creating audio...',
        script: data.script
      }));

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 3: Audio generated
      setGenerationProgress(prev => ({
        ...prev,
        step: 3,
        message: 'Audio generated! Creating captions...',
        audioUrl: data.audioUrl
      }));

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 4: Captions generated
      setGenerationProgress(prev => ({
        ...prev,
        step: 4,
        message: 'Captions ready! Generating AI images...',
        captions: data.captions
      }));

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 5: Images generated
      setGenerationProgress(prev => ({
        ...prev,
        step: 5,
        message: 'All assets generated successfully! 🎉',
        images: data.images
      }));

      // Deduct tokens
      setTokens(prev => prev - 20);
      
      // Show results
      setShowResults(true);
      
    } catch (error: any) {
      console.error('Video generation error:', error);
      setGenerationProgress(prev => ({
        ...prev,
        error: error.message || 'Failed to generate video. Please try again.'
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#16161B] border-r border-[#7C3AED]/20 flex flex-col z-50">
        {/* Logo */}
        <div className="p-6 border-b border-[#7C3AED]/20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-[#7C3AED] to-[#00E7FF] rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gradient">ArabicVibes</span>
              <span className="text-[10px] text-gray-400">محتوى عربي</span>
            </div>
          </Link>
        </div>

        {/* Tokens Display */}
        <div className="p-4 border-b border-[#7C3AED]/20">
          <div className="bg-linear-to-r from-[#7C3AED]/20 to-[#00E7FF]/20 border border-[#7C3AED]/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#FFD700]" />
                <span className="text-sm font-medium">Tokens</span>
              </div>
              <button className="text-[#00E7FF] text-xs hover:underline">
                Get More
              </button>
            </div>
            <p className="text-2xl font-bold">{tokens}</p>
            <p className="text-xs text-gray-400 mt-1">20 tokens per video</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-linear-to-r from-[#7C3AED]/20 to-[#00E7FF]/20 border border-[#7C3AED]/50 text-white'
                    : 'text-gray-400 hover:bg-[#7C3AED]/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}

          {/* Premium Upgrade Button */}
          <Link href="/pricing" className="w-full mt-4 px-4 py-3 bg-linear-to-r from-[#FFD700] to-[#FFA500] rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Crown className="w-5 h-5" />
            Upgrade to Pro
          </Link>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-[#7C3AED]/20">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0F0F12] rounded-xl">
            <UserButton afterSignOutUrl="/" />
            <div className="flex-1">
              <p className="text-sm font-medium">My Account</p>
              <p className="text-xs text-gray-400">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#0F0F12]/80 backdrop-blur-xl border-b border-[#7C3AED]/20">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-[#7C3AED] to-[#00E7FF] bg-clip-text text-transparent">
                AI Video Generator
              </h1>
              <p className="text-sm text-gray-400 mt-1">Create professional videos with AI-powered assets</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Voice Language Selector */}
              <div className="flex items-center gap-2 px-3 py-2 bg-[#16161B] rounded-xl border border-[#7C3AED]/20">
                <Music className="w-4 h-4 text-gray-400" />
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'fr')}
                  className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="en">🇬🇧 English</option>
                  <option value="fr">🇫🇷 French</option>
                </select>
              </div>

              <div className="px-4 py-2 bg-[#16161B] rounded-xl border border-[#7C3AED]/20">
                <span className="text-sm text-gray-400">Free Plan • </span>
                <button className="text-[#FFD700] hover:underline text-sm font-medium">Watch Ad +50</button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#16161B] rounded-2xl p-6 border border-[#7C3AED]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm">Videos Created</h3>
                <div className="w-10 h-10 bg-[#7C3AED]/20 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-[#7C3AED]" />
                </div>
              </div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-gray-400 mt-2">+3 this week</p>
            </div>

            <div className="bg-[#16161B] rounded-2xl p-6 border border-[#00E7FF]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm">AI Assets Generated</h3>
                <div className="w-10 h-10 bg-[#00E7FF]/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#00E7FF]" />
                </div>
              </div>
              <p className="text-3xl font-bold">1.2K</p>
              <p className="text-sm text-gray-400 mt-2">+245 this week</p>
            </div>

            <div className="bg-[#16161B] rounded-2xl p-6 border border-[#FFD700]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm">Tokens Balance</h3>
                <div className="w-10 h-10 bg-[#FFD700]/20 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-[#FFD700]" />
                </div>
              </div>
              <p className="text-3xl font-bold">{tokens}</p>
              <p className="text-sm text-gray-400 mt-2">Earn more by watching ads</p>
            </div>

            <div className="bg-[#16161B] rounded-2xl p-6 border border-[#7C3AED]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm">Storage Used</h3>
                <div className="w-10 h-10 bg-[#7C3AED]/20 rounded-lg flex items-center justify-center">
                  <Library className="w-5 h-5 text-[#7C3AED]" />
                </div>
              </div>
              <p className="text-3xl font-bold">2.4 GB</p>
              <p className="text-sm text-gray-400 mt-2">of 10 GB</p>
            </div>
          </div>

          {/* Video Generation Form */}
          <div className="bg-[#16161B] rounded-2xl p-8 border border-[#7C3AED]/20">
            <h2 className="text-2xl font-bold mb-6">Generate Video Assets</h2>
            
            <div className="space-y-6">
              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-400">
                  Choose Platform *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <button
                        key={platform.id}
                        onClick={() => setSelectedPlatform(platform.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedPlatform === platform.id
                            ? 'border-[#00E7FF] bg-[#00E7FF]/10'
                            : 'border-[#7C3AED]/20 hover:border-[#7C3AED]/50'
                        }`}
                      >
                        <div className="flex justify-center mb-2">
                          <Icon className="w-8 h-8 text-[#00E7FF]" />
                        </div>
                        <p className="text-sm font-medium">{platform.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{platform.aspectRatio}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prompt Input */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-400">
                  Describe Your Video *
                </label>
                <textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Example: Explain blockchain technology in simple terms. Show futuristic digital graphics, tech animations, modern clean studio, professional lighting, corporate blue theme, calm background music."
                  className="w-full px-6 py-4 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white placeholder:text-gray-500 focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20 transition-all resize-none"
                  rows={4}
                  dir="auto"
                  disabled={isGenerating}
                />
              </div>

              {/* Voice Gender Selection */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-400">
                  Voice Gender
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedVoiceGender('female')}
                    disabled={isGenerating}
                    className={`px-4 py-3 rounded-xl text-sm transition-all border-2 ${
                      selectedVoiceGender === 'female'
                        ? 'border-[#00E7FF] bg-[#00E7FF]/10 text-white'
                        : 'border-[#7C3AED]/30 bg-[#0F0F12] text-gray-400 hover:border-[#7C3AED]/50'
                    } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    👩 Female Voice
                  </button>
                  <button
                    onClick={() => setSelectedVoiceGender('male')}
                    disabled={isGenerating}
                    className={`px-4 py-3 rounded-xl text-sm transition-all border-2 ${
                      selectedVoiceGender === 'male'
                        ? 'border-[#00E7FF] bg-[#00E7FF]/10 text-white'
                        : 'border-[#7C3AED]/30 bg-[#0F0F12] text-gray-400 hover:border-[#7C3AED]/50'
                    } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    👨 Male Voice
                  </button>
                </div>
              </div>

              {/* Additional Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">
                    Background Music
                  </label>
                  <select className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20">
                    <option>Modern Upbeat</option>
                    <option>Cinematic</option>
                    <option>Corporate</option>
                    <option>Ambient Calm</option>
                    <option>Tech / Electronic</option>
                    <option>No Music</option>
                    <option>Instrumental</option>
                    <option>No Music</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">
                    Text Overlay
                  </label>
                  <select className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20">
                    <option>Auto Captions</option>
                    <option>Animated Text</option>
                    <option>Animated Text</option>
                    <option>Title Only</option>
                    <option>Quotes</option>
                    <option>No Text</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">
                    Video Quality
                  </label>
                  <select className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20">
                    <option>HD 1080p (Free)</option>
                    <option>SD 720p (Free)</option>
                    <option>4K UHD (Pro)</option>
                  </select>
                </div>
              </div>

              {/* Cost Display and Generate Button */}
              <div className="flex items-center justify-between pt-6 border-t border-[#7C3AED]/20">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[#FFD700]" />
                    <p className="text-sm">
                      <span className="text-gray-400">Cost: </span>
                      <span className="text-white font-semibold">20 Tokens</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Remaining: <span className="text-white font-semibold">{tokens - 20} Tokens</span>
                  </p>
                  <button className="text-[#00E7FF] hover:underline text-sm font-medium flex items-center gap-1">
                    <PlayCircle className="w-4 h-4" />
                    Watch Ad for +50 Tokens
                  </button>
                </div>
                
                <button 
                  onClick={handleGenerateVideo}
                  disabled={tokens < 20 || isGenerating || !userPrompt.trim()}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    tokens >= 20 && !isGenerating && userPrompt.trim()
                      ? 'bg-linear-to-r from-[#7C3AED] to-[#00E7FF] hover:opacity-90'
                      : 'bg-gray-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Generate Video</span>
                    </>
                  )}
                </button>
              </div>

              {/* Generation Progress */}
              {isGenerating && (
                <div className="mt-6 p-6 bg-[#0F0F12] rounded-xl border border-[#7C3AED]/30">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Video Generation Progress</h3>
                      <span className="text-sm text-gray-400">Step {generationProgress.step} of 5</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#16161B] rounded-full h-2">
                      <div 
                        className="bg-linear-to-r from-[#7C3AED] to-[#00E7FF] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(generationProgress.step / 5) * 100}%` }}
                      />
                    </div>

                    {/* Status Message */}
                    <div className="flex items-center gap-3 p-4 bg-[#16161B] rounded-lg">
                      <Loader2 className="w-5 h-5 text-[#00E7FF] animate-spin" />
                      <p className="text-white">{generationProgress.message}</p>
                    </div>

                    {/* Step Indicators */}
                    <div className="grid grid-cols-5 gap-3">
                      <div className={`p-3 rounded-lg border ${generationProgress.step >= 1 ? 'border-[#00E7FF] bg-[#00E7FF]/10' : 'border-[#7C3AED]/30'}`}>
                        <FileText className={`w-5 h-5 mb-1 ${generationProgress.step >= 1 ? 'text-[#00E7FF]' : 'text-gray-400'}`} />
                        <p className="text-xs">Script</p>
                      </div>
                      <div className={`p-3 rounded-lg border ${generationProgress.step >= 2 ? 'border-[#00E7FF] bg-[#00E7FF]/10' : 'border-[#7C3AED]/30'}`}>
                        <Music className={`w-5 h-5 mb-1 ${generationProgress.step >= 2 ? 'text-[#00E7FF]' : 'text-gray-400'}`} />
                        <p className="text-xs">Audio</p>
                      </div>
                      <div className={`p-3 rounded-lg border ${generationProgress.step >= 3 ? 'border-[#00E7FF] bg-[#00E7FF]/10' : 'border-[#7C3AED]/30'}`}>
                        <FileText className={`w-5 h-5 mb-1 ${generationProgress.step >= 3 ? 'text-[#00E7FF]' : 'text-gray-400'}`} />
                        <p className="text-xs">Captions</p>
                      </div>
                      <div className={`p-3 rounded-lg border ${generationProgress.step >= 4 ? 'border-[#00E7FF] bg-[#00E7FF]/10' : 'border-[#7C3AED]/30'}`}>
                        <ImagePlus className={`w-5 h-5 mb-1 ${generationProgress.step >= 4 ? 'text-[#00E7FF]' : 'text-gray-400'}`} />
                        <p className="text-xs">Images</p>
                      </div>
                      <div className={`p-3 rounded-lg border ${generationProgress.step >= 5 ? 'border-[#00E7FF] bg-[#00E7FF]/10' : 'border-[#7C3AED]/30'}`}>
                        <CheckCircle className={`w-5 h-5 mb-1 ${generationProgress.step >= 5 ? 'text-[#00E7FF]' : 'text-gray-400'}`} />
                        <p className="text-xs">Complete</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {generationProgress.error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-500 font-semibold mb-1">Generation Failed</h4>
                    <p className="text-red-400 text-sm">{generationProgress.error}</p>
                  </div>
                </div>
              )}

              {/* Results Display */}
              {showResults && generationProgress.images.length > 0 && (
                <div className="mt-6 p-6 bg-[#0F0F12] rounded-xl border border-[#00E7FF]/30">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <h3 className="text-lg font-semibold text-green-500">Video Assets Generated Successfully! 🎉</h3>
                  </div>

                  {/* Script */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Generated Script:</h4>
                    <div className="p-4 bg-[#16161B] rounded-lg max-h-40 overflow-y-auto">
                      <p className="text-sm text-white whitespace-pre-wrap">{generationProgress.script}</p>
                    </div>
                  </div>

                  {/* Audio */}
                  {generationProgress.audioUrl && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Audio:</h4>
                      <audio controls className="w-full" src={generationProgress.audioUrl}>
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}

                  {/* Images */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Generated Images ({generationProgress.images.length}):</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {generationProgress.images.map((imageUrl, index) => (
                        <div key={index} className="aspect-square bg-[#16161B] rounded-lg border border-[#7C3AED]/30 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={`Scene ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Captions Preview */}
                  {generationProgress.captions.srt && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Captions (SRT):</h4>
                      <div className="p-4 bg-[#16161B] rounded-lg max-h-40 overflow-y-auto">
                        <pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono">
                          {generationProgress.captions.srt.substring(0, 500)}...
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 border border-[#7C3AED]/30 rounded-lg font-medium transition-colors">
                      Download All Assets
                    </button>
                    <button className="flex-1 px-4 py-3 bg-[#00E7FF]/20 hover:bg-[#00E7FF]/30 border border-[#00E7FF]/30 rounded-lg font-medium transition-colors">
                      Render Video (Coming Soon)
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 mt-4 text-center">
                    💡 All assets are ready! Video rendering (combining images + audio + captions) coming soon.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Videos */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Videos</h2>
              <Link href="/dashboard/videos" className="text-[#00E7FF] hover:text-[#00E7FF]/80 text-sm font-medium">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, title: 'TikTok Dance Challenge', platform: 'TikTok 📱', views: '1.2K' },
                { id: 2, title: 'Instagram Product Review', platform: 'Instagram 📷', views: '856' },
                { id: 3, title: 'YouTube Tutorial', platform: 'YouTube ▶️', views: '2.4K' },
              ].map((video) => (
                <div key={video.id} className="bg-[#16161B] rounded-xl border border-[#7C3AED]/20 overflow-hidden hover:border-[#00E7FF]/50 transition-all group">
                  <div className="aspect-video bg-linear-to-br from-[#7C3AED]/20 to-[#00E7FF]/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-1 bg-[#00E7FF]/20 border border-[#00E7FF]/30 rounded-lg text-xs font-medium backdrop-blur-sm">
                      Complete
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-xs">
                      {video.platform}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{video.views} views • 2 hours ago</p>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 border border-[#7C3AED]/30 rounded-lg text-sm font-medium transition-colors">
                        View
                      </button>
                      <button className="flex-1 px-3 py-2 bg-[#00E7FF]/20 hover:bg-[#00E7FF]/30 border border-[#00E7FF]/30 rounded-lg text-sm font-medium transition-colors">
                        Share
                      </button>
                      <button className="px-3 py-2 bg-[#FFD700]/20 hover:bg-[#FFD700]/30 border border-[#FFD700]/30 rounded-lg text-sm font-medium transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
