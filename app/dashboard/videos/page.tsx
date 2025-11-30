'use client'

import { Video, Download, Share2, Trash2, Eye, Filter, Search, Smartphone, Instagram, Youtube, Linkedin, Facebook, Twitter } from 'lucide-react';
import { useState } from 'react';

export default function MyVideosPage() {
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const platformIcons: Record<string, React.ComponentType<any>> = {
    'TikTok': Smartphone,
    'Instagram': Instagram,
    'YouTube': Youtube,
    'LinkedIn': Linkedin,
    'Facebook': Facebook,
    'Twitter': Twitter,
  };

  const videos = [
    { id: 1, title: 'TikTok Dance Challenge', platform: 'TikTok', views: '1.2K', date: '2 hours ago', status: 'complete', thumbnail: 'thumbnail1' },
    { id: 2, title: 'Instagram Product Review', platform: 'Instagram', views: '856', date: '5 hours ago', status: 'complete', thumbnail: 'thumbnail2' },
    { id: 3, title: 'YouTube Tutorial', platform: 'YouTube', views: '2.4K', date: '1 day ago', status: 'complete', thumbnail: 'thumbnail3' },
    { id: 4, title: 'LinkedIn Professional', platform: 'LinkedIn', views: '324', date: '2 days ago', status: 'complete', thumbnail: 'thumbnail4' },
    { id: 5, title: 'Facebook Story', platform: 'Facebook', views: '567', date: '3 days ago', status: 'complete', thumbnail: 'thumbnail5' },
    { id: 6, title: 'Twitter Announcement', platform: 'Twitter', views: '892', date: '4 days ago', status: 'complete', thumbnail: 'thumbnail6' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Videos</h1>
        <p className="text-gray-400">Manage all your generated videos</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#16161B] rounded-2xl p-6 border border-[#7C3AED]/20 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white placeholder:text-gray-500 focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20"
            >
              <option value="all">All Platforms</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => {
          const PlatformIcon = platformIcons[video.platform] || Video;
          return (
            <div key={video.id} className="bg-[#16161B] rounded-xl border border-[#7C3AED]/20 overflow-hidden hover:border-[#00E7FF]/50 transition-all group">
              {/* Thumbnail */}
              <div className="aspect-video bg-linear-to-br from-[#7C3AED]/20 to-[#00E7FF]/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                </div>
                {/* Platform Badge */}
                <div className="absolute top-2 left-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg text-xs font-medium flex items-center gap-1.5">
                  <PlatformIcon className="w-3.5 h-3.5 text-[#00E7FF]" />
                  {video.platform}
                </div>
                {/* Status Badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-[#00E7FF]/20 border border-[#00E7FF]/30 rounded-lg text-xs font-medium backdrop-blur-sm">
                  Complete
                </div>
                {/* Views */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-xs flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {video.views}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-1">{video.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{video.date}</p>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button className="px-3 py-2 bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 border border-[#7C3AED]/30 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="px-3 py-2 bg-[#00E7FF]/20 hover:bg-[#00E7FF]/30 border border-[#00E7FF]/30 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="px-3 py-2 bg-[#FFD700]/20 hover:bg-[#FFD700]/30 border border-[#FFD700]/30 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <button className="w-full mt-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 text-red-400">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
          );
        })}
      </div>

      {/* Empty State (if no videos) */}
      {videos.length === 0 && (
        <div className="text-center py-16">
          <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No videos yet</h3>
          <p className="text-gray-400 mb-6">Start generating your first video!</p>
          <button className="px-6 py-3 bg-linear-to-r from-[#7C3AED] to-[#00E7FF] rounded-xl font-semibold hover:opacity-90">
            Generate Video
          </button>
        </div>
      )}
    </div>
  );
}
