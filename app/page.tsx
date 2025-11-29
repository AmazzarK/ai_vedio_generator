'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F12] text-white relative overflow-hidden">
      {/* Cinematic Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Film Strips */}
        <motion.div
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-10 w-64 h-40 opacity-10"
        >
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <rect x="10" y="10" width="180" height="100" fill="none" stroke="#7C3AED" strokeWidth="2"/>
            <rect x="20" y="20" width="60" height="80" fill="#7C3AED" opacity="0.3"/>
            <rect x="90" y="20" width="60" height="80" fill="#00E7FF" opacity="0.3"/>
            <rect x="160" y="20" width="10" height="15" fill="#7C3AED"/>
            <rect x="160" y="40" width="10" height="15" fill="#7C3AED"/>
            <rect x="160" y="60" width="10" height="15" fill="#7C3AED"/>
            <rect x="160" y="80" width="10" height="15" fill="#7C3AED"/>
          </svg>
        </motion.div>

        {/* Camera Lens Circle */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-10 w-96 h-96"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#00E7FF" strokeWidth="1" opacity="0.4"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#7C3AED" strokeWidth="2" opacity="0.6"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke="#00E7FF" strokeWidth="1" opacity="0.4"/>
            <circle cx="100" cy="100" r="20" fill="#7C3AED" opacity="0.3"/>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
                y2={100 + 70 * Math.sin((angle * Math.PI) / 180)}
                stroke="#00E7FF"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
          </svg>
        </motion.div>

        {/* Play Button Icon */}
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-40 right-20 w-48 h-48 opacity-10"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#7C3AED" strokeWidth="2"/>
            <polygon points="35,25 35,75 75,50" fill="#00E7FF" opacity="0.6"/>
          </svg>
        </motion.div>

        {/* Clapperboard */}
        <motion.div
          animate={{
            rotate: [-5, 5, -5],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-1/4 w-56 h-56 opacity-10"
        >
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect x="10" y="40" width="100" height="60" fill="#16161B" stroke="#7C3AED" strokeWidth="2"/>
            <polygon points="10,40 30,20 110,20 110,40" fill="#00E7FF" opacity="0.5"/>
            <line x1="40" y1="20" x2="40" y2="40" stroke="#0F0F12" strokeWidth="3"/>
            <line x1="70" y1="20" x2="70" y2="40" stroke="#0F0F12" strokeWidth="3"/>
            <line x1="100" y1="20" x2="100" y2="40" stroke="#0F0F12" strokeWidth="3"/>
          </svg>
        </motion.div>

        {/* Waveform */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-32 opacity-10"
        >
          <svg viewBox="0 0 200 80" className="w-full h-full">
            {[...Array(20)].map((_, i) => (
              <rect
                key={i}
                x={i * 10}
                y={40 - Math.random() * 30}
                width="6"
                height={Math.random() * 60}
                fill={i % 2 === 0 ? "#7C3AED" : "#00E7FF"}
                opacity="0.4"
              />
            ))}
          </svg>
        </motion.div>

        {/* Floating Video Frames */}
        <motion.div
          animate={{
            y: [0, -80, 0],
            rotate: [0, -10, 0]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-10 w-72 h-48 opacity-10"
        >
          <svg viewBox="0 0 160 100" className="w-full h-full">
            <rect x="5" y="5" width="70" height="45" fill="none" stroke="#00E7FF" strokeWidth="1.5" rx="3"/>
            <rect x="85" y="5" width="70" height="45" fill="none" stroke="#7C3AED" strokeWidth="1.5" rx="3"/>
            <rect x="5" y="55" width="70" height="45" fill="none" stroke="#7C3AED" strokeWidth="1.5" rx="3"/>
            <rect x="85" y="55" width="70" height="45" fill="none" stroke="#00E7FF" strokeWidth="1.5" rx="3"/>
          </svg>
        </motion.div>
      </div>

      {/* Animated Grid Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      
      {/* Gradient Orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#7C3AED] rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#00E7FF] rounded-full blur-[150px] opacity-20 pointer-events-none" />

      {/* Header/Navbar */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-[#7C3AED]/20 backdrop-blur-xl bg-[#0F0F12]/80 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-lg holographic-gradient flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gradient">AIVideoGen</h1>
          </motion.div>
          
          <nav className="flex items-center gap-4">
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost" className="hover:bg-[#7C3AED]/10 hover:text-[#00E7FF]">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="holographic-gradient hover:opacity-90 transition-opacity">
                  Try Free
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="ghost" className="hover:bg-[#7C3AED]/10">
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-32 text-center relative">
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
          >
            Forge Cinematic Videos{" "}
            <span className="text-gradient">Instantly</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#A5A5A7] max-w-3xl mx-auto leading-relaxed"
          >
            Transform ideas into professional AI-generated videos in seconds. 
            <br className="hidden md:block" />
            Built for creators, marketers, and visionaries.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <SignedOut>
              <Link href="/sign-up">
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-6 holographic-gradient hover:opacity-90 glow-cyan transition-all hover:scale-105"
                >
                  Start Free Trial →
                </Button>
              </Link>
              <Link href="#features">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-10 py-6 border-[#7C3AED]/50 hover:border-[#00E7FF] hover:bg-[#7C3AED]/10 transition-all"
                >
                  See Features
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-6 holographic-gradient hover:opacity-90 glow-cyan transition-all"
                >
                  Open Dashboard →
                </Button>
              </Link>
            </SignedIn>
          </motion.div>
        </div>
      </section>

      {/* Preview Studio Section - Auth-Aware */}
      <section className="container mx-auto px-4 py-32 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              <SignedOut>
                See <span className="text-gradient">AIVideoGen</span> in Action
              </SignedOut>
              <SignedIn>
                Your <span className="text-gradient">Creative Studio</span>
              </SignedIn>
            </h3>
            <p className="text-xl text-[#A5A5A7]">
              <SignedOut>
                Create an account to start generating professional videos
              </SignedOut>
              <SignedIn>
                Generate, manage, and share your AI-powered videos
              </SignedIn>
            </p>
          </motion.div>

          {/* SIGNED OUT - Preview Mode */}
          <SignedOut>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Disabled Prompt Input */}
              <div className="relative p-8 bg-[#16161B] rounded-2xl border border-[#7C3AED]/20">
                <div className="absolute inset-0 bg-linear-to-br from-[#7C3AED]/5 to-[#00E7FF]/5 rounded-2xl" />
                <div className="relative z-10">
                  <label className="block text-sm font-medium mb-3 text-[#A5A5A7]">
                    Video Prompt
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled
                      placeholder="A cinematic sunset over mountains with flying birds..."
                      className="w-full px-6 py-4 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white placeholder:text-[#A5A5A7]/50 cursor-not-allowed opacity-60"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0F0F12]/80 backdrop-blur-sm rounded-xl">
                      <div className="text-center space-y-3">
                        <svg className="w-12 h-12 mx-auto text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <p className="text-sm font-medium text-white">Sign in to start generating videos</p>
                        <Link href="/sign-up">
                          <Button className="holographic-gradient glow-cyan">
                            Create Free Account
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Videos Grid */}
              <div>
                <h4 className="text-2xl font-bold mb-6 text-center">Community Creations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Sunset Journey", duration: "0:45", views: "1.2K" },
                    { title: "Future City", duration: "1:20", views: "2.8K" },
                    { title: "Ocean Depths", duration: "0:58", views: "954" },
                  ].map((video, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * idx }}
                      className="group relative bg-[#16161B] rounded-xl border border-[#7C3AED]/20 overflow-hidden cursor-not-allowed"
                    >
                      {/* Video Thumbnail */}
                      <div className="aspect-video bg-linear-to-br from-[#7C3AED]/20 to-[#00E7FF]/20 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-16 h-16 text-[#7C3AED]/50" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                          </svg>
                        </div>
                        {/* Watermark */}
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-[#0F0F12]/80 backdrop-blur-sm rounded text-xs text-[#A5A5A7]">
                          Created with AIVideoGen
                        </div>
                        {/* Locked Overlay */}
                        <div className="absolute inset-0 bg-[#0F0F12]/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="text-center">
                            <svg className="w-8 h-8 mx-auto mb-2 text-[#00E7FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <p className="text-xs text-white">Sign in to view</p>
                          </div>
                        </div>
                      </div>
                      {/* Video Info */}
                      <div className="p-4">
                        <h5 className="font-semibold mb-2">{video.title}</h5>
                        <div className="flex items-center justify-between text-sm text-[#A5A5A7]">
                          <span>{video.duration}</span>
                          <span>{video.views} views</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Banner */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center p-8 bg-[#16161B] rounded-2xl border border-[#7C3AED]/30"
              >
                <h4 className="text-2xl font-bold mb-3">Ready to Create Your Own?</h4>
                <p className="text-[#A5A5A7] mb-6">Join thousands of creators generating stunning videos with AI</p>
                <Link href="/sign-up">
                  <Button size="lg" className="holographic-gradient glow-cyan hover:scale-105 transition-transform">
                    Create Free Account to Generate Videos →
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </SignedOut>

          {/* SIGNED IN - Interactive Studio */}
          <SignedIn>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Active Prompt Input */}
              <div className="p-8 bg-[#16161B] rounded-2xl border border-[#7C3AED]/20 hover:border-[#00E7FF]/50 transition-colors">
                <label className="block text-sm font-medium mb-3 text-[#A5A5A7]">
                  Describe Your Video
                </label>
                <div className="space-y-4">
                  <textarea
                    placeholder="A cinematic sunset over mountains with flying birds, 4K quality, dramatic lighting..."
                    className="w-full px-6 py-4 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white placeholder:text-[#A5A5A7]/70 focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20 transition-all resize-none"
                    rows={4}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#A5A5A7]">Tip: Be specific about style, mood, and details</span>
                    <Button className="holographic-gradient glow-cyan hover:scale-105 transition-transform">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Generate Video
                    </Button>
                  </div>
                </div>
              </div>

              {/* Your Creations */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-bold">Your Creations</h4>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="hover:bg-[#7C3AED]/10 hover:text-[#00E7FF]">
                      View All in Dashboard →
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "My First Video", status: "Complete", date: "2 hours ago" },
                    { title: "Product Demo", status: "Rendering", date: "Just now", progress: 65 },
                    { title: "Tutorial Intro", status: "Complete", date: "Yesterday" },
                  ].map((video, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * idx }}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(124, 58, 237, 0.3)" }}
                      className="group bg-[#16161B] rounded-xl border border-[#7C3AED]/20 hover:border-[#00E7FF]/50 overflow-hidden transition-all cursor-pointer"
                    >
                      {/* Video Thumbnail */}
                      <div className="aspect-video bg-linear-to-br from-[#7C3AED]/20 to-[#00E7FF]/20 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {video.status === "Rendering" ? (
                            <div className="text-center space-y-2">
                              <svg className="w-12 h-12 text-[#00E7FF] animate-spin mx-auto" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <p className="text-sm text-[#00E7FF]">{video.progress}%</p>
                            </div>
                          ) : (
                            <svg className="w-16 h-16 text-[#7C3AED]/50 group-hover:text-[#00E7FF] transition-colors" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                            </svg>
                          )}
                        </div>
                        {/* Status Badge */}
                        <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                          video.status === "Complete" 
                            ? "bg-[#00E7FF]/20 text-[#00E7FF] border border-[#00E7FF]/30" 
                            : "bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30"
                        }`}>
                          {video.status}
                        </div>
                      </div>
                      {/* Video Info & Actions */}
                      <div className="p-4">
                        <h5 className="font-semibold mb-2">{video.title}</h5>
                        <p className="text-sm text-[#A5A5A7] mb-4">{video.date}</p>
                        {video.status === "Complete" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1 border-[#7C3AED]/50 hover:border-[#00E7FF] hover:bg-[#00E7FF]/10">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="border-[#7C3AED]/50 hover:border-[#00E7FF] hover:bg-[#00E7FF]/10">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                              </svg>
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </SignedIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-32 text-center relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8 p-12 rounded-3xl border border-[#7C3AED]/30 bg-[#16161B]/50 backdrop-blur-xl relative overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 holographic-gradient opacity-5" />
          
          <div className="relative z-10">
            <h3 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to <span className="text-gradient">Transform</span> Your Content?
            </h3>
            <p className="text-xl md:text-2xl text-[#A5A5A7] mb-8">
              Join 10,000+ creators generating next-level videos with AI
            </p>
            <SignedOut>
              <Link href="/sign-up">
                <Button 
                  size="lg" 
                  className="text-xl px-12 py-7 holographic-gradient hover:opacity-90 glow-cyan transition-all hover:scale-105"
                >
                  Start Creating Free →
                </Button>
              </Link>
              <p className="text-sm text-[#A5A5A7] mt-4">
                No credit card required • Instant access
              </p>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="text-xl px-12 py-7 holographic-gradient hover:opacity-90 glow-cyan transition-all"
                >
                  Launch Dashboard →
                </Button>
              </Link>
            </SignedIn>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#7C3AED]/20 py-16 backdrop-blur-xl bg-[#0F0F12]/80">
        <div className="container mx-auto px-4">
          {/* Features Section in Footer */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Next-Level <span className="text-gradient">AI Capabilities</span>
              </h3>
              <p className="text-sm text-[#A5A5A7]">
                Engineered for speed, precision, and creative freedom
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  title: "Neural Video Engine",
                  description: "State-of-the-art AI models generate cinema-quality video from text prompts in real-time."
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Instant Rendering",
                  description: "GPU-accelerated pipeline delivers professional videos in under 60 seconds. No waiting."
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  ),
                  title: "Infinite Customization",
                  description: "Full creative control with style transfer, scene composition, and advanced editing tools."
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="flex flex-col items-start p-6 bg-[#16161B]/50 rounded-xl border border-[#7C3AED]/10 hover:border-[#00E7FF]/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-linear-to-br from-[#7C3AED]/20 to-[#00E7FF]/20 rounded-lg flex items-center justify-center text-[#00E7FF]">
                      {feature.icon}
                    </div>
                    <h4 className="text-lg font-semibold">{feature.title}</h4>
                  </div>
                  <p className="text-sm text-[#A5A5A7] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-[#7C3AED]/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg holographic-gradient flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                  </svg>
                </div>
                <span className="font-bold text-gradient">AIVideoGen</span>
              </div>
              <p className="text-[#A5A5A7] text-sm">
                &copy; 2025 AIVideoGen. The future of video creation.
              </p>
              <div className="flex gap-6 text-sm text-[#A5A5A7]">
                <a href="#" className="hover:text-[#00E7FF] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[#00E7FF] transition-colors">Terms</a>
                <a href="#" className="hover:text-[#00E7FF] transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
