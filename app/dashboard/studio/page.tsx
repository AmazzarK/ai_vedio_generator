'use client'

import { Sparkles, Wand2, Music, Type, Palette, Image, Mic, Layers, Zap, Film, Zap as Lightning, Star, Aperture } from 'lucide-react';
import { useState } from 'react';

export default function AIStudioPage() {
  const [selectedTool, setSelectedTool] = useState('enhance');

  const tools = [
    { id: 'enhance', name: 'AI Enhance', icon: Sparkles, description: 'Upscale and enhance video quality', color: '#7C3AED' },
    { id: 'style-transfer', name: 'Style Transfer', icon: Palette, description: 'Apply artistic styles to videos', color: '#00E7FF' },
    { id: 'music-gen', name: 'Music Generator', icon: Music, description: 'Generate custom background music', color: '#FFD700' },
    { id: 'voice-over', name: 'AI Voice-Over', icon: Mic, description: 'Add natural sounding narration', color: '#FF6B9D' },
    { id: 'text-effects', name: 'Text Effects', icon: Type, description: 'Animated text and captions', color: '#00FF87' },
    { id: 'scene-mix', name: 'Scene Mixer', icon: Layers, description: 'Combine multiple scenes', color: '#FF8C42' },
  ];

  const templateIcons: Record<string, React.ComponentType<any>> = {
    'Intros': Film,
    'Transitions': Lightning,
    'Titles': Type,
    'Outros': Star,
    'Effects': Zap,
    'Backgrounds': Aperture,
  };

  const templates = [
    { id: 1, name: 'Cinematic Intro', category: 'Intros', uses: '2.4K' },
    { id: 2, name: 'Modern Transition', category: 'Transitions', uses: '1.8K' },
    { id: 3, name: 'Neon Title', category: 'Titles', uses: '3.1K' },
    { id: 4, name: 'Epic Outro', category: 'Outros', uses: '1.5K' },
    { id: 5, name: 'Glitch Effect', category: 'Effects', uses: '2.7K' },
    { id: 6, name: 'Particles BG', category: 'Backgrounds', uses: '2.2K' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Studio</h1>
        <p className="text-gray-400">Advanced AI tools for video enhancement and editing</p>
      </div>

      {/* AI Tools Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">AI Powered Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`p-6 rounded-2xl border-2 transition-all text-left group hover:scale-105 ${
                  selectedTool === tool.id
                    ? 'bg-[#16161B] border-[#7C3AED]'
                    : 'bg-[#16161B]/50 border-[#7C3AED]/20 hover:border-[#00E7FF]/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${tool.color}20`, border: `1px solid ${tool.color}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: tool.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{tool.name}</h3>
                    <p className="text-sm text-gray-400">{tool.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tool Interface */}
      <div className="bg-[#16161B] rounded-2xl p-8 border border-[#7C3AED]/20 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Wand2 className="w-6 h-6 text-[#7C3AED]" />
          <h2 className="text-2xl font-semibold">
            {tools.find(t => t.id === selectedTool)?.name}
          </h2>
        </div>

        {/* Upload Area */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Upload Video</label>
          <div className="border-2 border-dashed border-[#7C3AED]/30 rounded-xl p-12 text-center hover:border-[#00E7FF]/50 transition-colors cursor-pointer">
            <Image className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 mb-1">Drag and drop your video here</p>
            <p className="text-sm text-gray-500">or click to browse</p>
          </div>
        </div>

        {/* Settings based on selected tool */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {selectedTool === 'enhance' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Enhancement Level</label>
                <select className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20">
                  <option>Light Enhancement</option>
                  <option>Medium Enhancement</option>
                  <option>Maximum Enhancement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Output Resolution</label>
                <select className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20">
                  <option>1080p (HD)</option>
                  <option>2K (QHD)</option>
                  <option>4K (UHD) - Pro</option>
                </select>
              </div>
            </>
          )}

          {selectedTool === 'music-gen' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Music Genre</label>
                <select className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20">
                  <option>Upbeat & Energetic</option>
                  <option>Calm & Relaxing</option>
                  <option>Epic & Cinematic</option>
                  <option>Electronic & Modern</option>
                  <option>Acoustic & Natural</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input 
                  type="number" 
                  defaultValue="30"
                  className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20"
                />
              </div>
            </>
          )}

          {selectedTool === 'voice-over' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Voice Type</label>
                <select className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20">
                  <option>Male - Professional</option>
                  <option>Female - Professional</option>
                  <option>Male - Casual</option>
                  <option>Female - Casual</option>
                  <option>Neutral - Documentary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* Action Button */}
        <button className="w-full py-4 bg-linear-to-r from-[#7C3AED] to-[#00E7FF] rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Zap className="w-5 h-5" />
          Apply AI Enhancement (15 tokens)
        </button>
      </div>

      {/* Templates Library */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Template Library</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {templates.map((template) => {
            const Icon = templateIcons[template.category] || Film;
            return (
              <button
                key={template.id}
                className="p-4 bg-[#16161B] rounded-xl border border-[#7C3AED]/20 hover:border-[#00E7FF]/50 transition-all text-center group hover:scale-105"
              >
                <div className="w-12 h-12 bg-[#7C3AED]/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#00E7FF]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#7C3AED] group-hover:text-[#00E7FF] transition-colors" />
                </div>
                <h3 className="font-medium text-sm mb-1 line-clamp-1">{template.name}</h3>
                <p className="text-xs text-gray-400">{template.uses} uses</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
