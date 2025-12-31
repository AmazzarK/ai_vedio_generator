'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    setTheme(initialTheme)
    setMounted(true)
  }, [])

  // Apply theme to DOM whenever theme changes
  useEffect(() => {
    if (mounted) {
      console.log('🎨 Applying theme to DOM:', theme)
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
        console.log('➕ Added dark class. HTML classList:', Array.from(document.documentElement.classList))
      } else {
        document.documentElement.classList.remove('dark')
        console.log('➖ Removed dark class. HTML classList:', Array.from(document.documentElement.classList))
      }
      console.log('🔍 Computed BG color:', window.getComputedStyle(document.documentElement).backgroundColor)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    console.log('🎯 Toggle button clicked!')
    console.log('📊 Current state:', { theme, mounted })
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      console.log('✅ State update:', prev, '→', newTheme)
      localStorage.setItem('theme', newTheme)
      console.log('💾 localStorage updated:', localStorage.getItem('theme'))
      return newTheme
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Subtle gradient background - functional, not decorative */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100 dark:bg-blue-950/30 rounded-full blur-3xl opacity-10 dark:opacity-20" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-5 dark:opacity-10" />
      </div>

      {/* Header/Navbar */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
              V
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">VideoAI</h1>
          </motion.div>
          
          <nav className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600">
                  Get Started
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content-focused */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="inline-block">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full border border-blue-300 dark:border-blue-800">
                Powered by AI
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Stop spending hours on video editing
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
              Transform your ideas into engaging videos. Write a description, let AI handle the rest.
              Scripts, voiceovers, visuals, captions—all automated.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <SignedOut>
                <Link href="/sign-up">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
                  >
                    Create Video Now
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    Learn More
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Open Dashboard
                  </Button>
                </Link>
              </SignedIn>
            </div>

            {/* Real social proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-8 border-t border-gray-200"
            >
              <p className="text-sm text-gray-600 font-medium mb-3">Trusted by creators</p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Join 10,000+ creators
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Video Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 md:h-full min-h-96 bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-300 flex flex-col overflow-hidden shadow-lg"
          >
            {/* Video background simulation */}
            <div className="absolute inset-0 bg-black opacity-20" />
            
            {/* Top bar */}
            <div className="relative z-10 bg-black/40 backdrop-blur-sm px-4 py-3 border-b border-white/10">
              <p className="text-white text-sm font-medium">Generated Video Preview</p>
            </div>
            
            {/* Main content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="mb-4 w-16 h-16 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
              
              <p className="text-white font-semibold text-lg mb-2">"AI-Generated Product Demo"</p>
              <p className="text-gray-300 text-sm mb-4">30 seconds • 1080p • Auto-captions</p>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20">Script Generated</span>
                <span className="px-3 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20">AI Voiceover</span>
                <span className="px-3 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20">Stock Footage</span>
              </div>
            </div>
            
            {/* Timeline */}
            <div className="relative z-10 bg-black/40 backdrop-blur-sm px-4 py-3 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-xs">0:15</span>
                <span className="text-gray-300 text-xs">0:30</span>
              </div>
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-blue-500 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Four simple steps
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                From idea to published video in minutes
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Write Your Concept",
                description: "Describe the video you want to create in plain language",
              },
              {
                step: "2",
                title: "AI Generates Script",
                description: "Our AI writes a professional, engaging script for you",
              },
              {
                step: "3",
                title: "Create Media",
                description: "Voiceover, visuals, and captions are generated automatically",
              },
              {
                step: "4",
                title: "Download & Share",
                description: "Export your video in any format, ready for social media",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-start">
                  <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-6 -right-4 text-gray-300 dark:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-linear-to-br from-blue-600 to-blue-700 dark:from-blue-900/40 dark:to-blue-800/40 dark:border dark:border-blue-700 rounded-2xl p-12 md:p-16 text-white dark:text-gray-100"
        >
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-4xl md:text-5xl font-bold leading-tight">
              Create your first video today
            </h3>
            <p className="text-lg text-blue-100 dark:text-blue-300">
              No credit card required. 100 free tokens on signup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <SignedOut>
                <Link href="/sign-up">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-50 font-semibold"
                  >
                    Get Started Free
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-50 font-semibold"
                  >
                    Open Dashboard
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Professional features, simple interface
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Everything creators need to produce broadcast-quality videos
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Generation",
                description: "Create complete videos from text in 2-3 minutes",
              },
              {
                title: "Professional Quality",
                description: "Broadcast-ready output optimized for any platform",
              },
              {
                title: "Full Customization",
                description: "Edit scripts, voices, visuals, and captions",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg dark:hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-600 transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white dark:bg-gray-950">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. Always cancel anytime.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Free",
              price: "$0",
              period: "Forever",
              description: "Perfect for trying VideoAI",
              tokens: "100 tokens/month",
              features: [
                "720p video quality",
                "30+ video styles",
                "Watermark on videos",
                "Community support",
                "Watch ads for extra tokens"
              ],
              cta: "Get Started",
              ctaVariant: "outline" as ButtonVariant
            },
            {
              name: "Pro",
              price: "$19",
              period: "per month",
              description: "Best for content creators",
              tokens: "500 tokens/month",
              popular: true,
              features: [
                "1080p HD quality",
                "90+ video styles",
                "No watermark",
                "Priority support",
                "50% faster generation",
                "Advanced AI tools",
                "Monthly billing"
              ],
              cta: "Start Free Trial",
              ctaVariant: "default" as ButtonVariant
            },
            {
              name: "Enterprise",
              price: "Custom",
              period: "Contact us",
              description: "For teams and agencies",
              tokens: "Unlimited tokens",
              features: [
                "4K video quality",
                "Custom video styles",
                "White label option",
                "Dedicated support",
                "Custom workflows",
                "API access",
                "SLA guaranteed"
              ],
              cta: "Contact Sales",
              ctaVariant: "outline" as ButtonVariant
            }
          ].map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-2xl border transition-all ${
                plan.popular
                  ? "border-blue-500 bg-linear-to-br from-blue-50 dark:from-blue-950/30 to-white dark:to-gray-900 shadow-xl dark:shadow-blue-900/20 ring-1 ring-blue-200 dark:ring-blue-800 md:scale-105"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{plan.period}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3 mb-6 border border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{plan.tokens}</p>
                </div>
                
                <Link href={plan.name === "Enterprise" ? "#" : "/sign-up"}>
                  <Button
                    variant={plan.ctaVariant}
                    size="lg"
                    className="w-full mb-8"
                  >
                    {plan.cta}
                  </Button>
                </Link>
                
                <div className="space-y-4">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold">
                  V
                </div>
                <span className="font-bold text-gray-900 dark:text-white">VideoAI</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Create professional videos with AI in minutes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Status</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; 2025 VideoAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">Twitter</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">LinkedIn</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
