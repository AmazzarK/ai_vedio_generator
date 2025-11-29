'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F12] text-white relative overflow-hidden">
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
              <span className="text-2xl">⚡</span>
            </div>
            <h1 className="text-2xl font-bold text-gradient">AIVideoForge</h1>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 backdrop-blur-sm">
              <span className="text-sm text-[#00E7FF]">✨ Powered by Next-Gen AI</span>
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
          >
             Cinematic Videos{" "}
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00E7FF]">10K+</div>
              <div className="text-sm text-[#A5A5A7]">Videos Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00E7FF]">98%</div>
              <div className="text-sm text-[#A5A5A7]">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00E7FF]">&lt;60s</div>
              <div className="text-sm text-[#A5A5A7]">Avg. Render</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-32 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              Next-Level <span className="text-gradient">AI Capabilities</span>
            </h3>
            <p className="text-xl text-[#A5A5A7]">
              Engineered for speed, precision, and creative freedom
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧠",
                title: "Neural Video Engine",
                description: "State-of-the-art AI models generate cinema-quality video from text prompts in real-time.",
                delay: 0.1
              },
              {
                icon: "⚡",
                title: "Instant Rendering",
                description: "GPU-accelerated pipeline delivers professional videos in under 60 seconds. No waiting.",
                delay: 0.2
              },
              {
                icon: "🎨",
                title: "Infinite Customization",
                description: "Full creative control with style transfer, scene composition, and advanced editing tools.",
                delay: 0.3
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(124, 58, 237, 0.3)"
                }}
                className="group p-8 bg-[#16161B] rounded-2xl border border-[#7C3AED]/20 hover:border-[#00E7FF]/50 transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-br from-[#7C3AED]/5 to-[#00E7FF]/5 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-linear-to-br from-[#7C3AED]/20 to-[#00E7FF]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-4xl">{feature.icon}</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-[#00E7FF] transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-[#A5A5A7] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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
      <footer className="border-t border-[#7C3AED]/20 py-12 backdrop-blur-xl bg-[#0F0F12]/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg holographic-gradient flex items-center justify-center">
                <span className="text-lg">⚡</span>
              </div>
              <span className="font-bold text-gradient">AIVideoForge</span>
            </div>
            <p className="text-[#A5A5A7] text-sm">
              &copy; 2025 AIVideoForge. Forging the future of video creation.
            </p>
            <div className="flex gap-6 text-sm text-[#A5A5A7]">
              <a href="#" className="hover:text-[#00E7FF] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#00E7FF] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#00E7FF] transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
