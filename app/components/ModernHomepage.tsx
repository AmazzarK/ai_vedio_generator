/**
 * MODERN HOMEPAGE REDESIGN
 * 
 * Replaces the futuristic dark theme with minimal, professional, human-centered design.
 * Light aesthetic with calm blue accents. Content-first, functional, accessible.
 */

'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Zap, Play, Check, ArrowRight, Users, Sparkles } from 'lucide-react'
import { Button } from './CleanComponents'

export default function HomePage() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* ===== NAVIGATION ===== */}
      <nav
        className={`sticky top-0 z-40 transition-colors ${
          isScrolled
            ? 'bg-white shadow-sm border-b border-gray-200'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              V
            </div>
            <span className="text-xl font-semibold text-gray-900">VideoAI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              How it Works
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="tertiary" size="sm">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button size="sm">
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <div>
            <div className="inline-block mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-300">
                Powered by AI
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Create Professional Videos in Minutes
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Transform your ideas into engaging videos. Write a description, let AI handle the rest.
              Scripts, voiceovers, visuals, captions—all automated.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" icon={Play}>
                <Link href="/dashboard/studio">Start Creating</Link>
              </Button>
              <Button variant="secondary" size="lg">
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3 font-medium">Trusted by creators</p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Join 10,000+ content creators
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="relative h-96 md:h-full min-h-96 bg-gray-100 rounded-2xl border border-gray-300 flex items-center justify-center">
            <div className="absolute inset-0 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl" />
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Placeholder for hero image */}
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Video preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete video creation toolkit with AI-powered features designed for creators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant Generation',
                description: 'Create videos from simple text descriptions in under a minute',
              },
              {
                icon: Users,
                title: 'Multiple Formats',
                description: 'Optimize for YouTube, TikTok, Instagram, or custom dimensions',
              },
              {
                icon: Check,
                title: 'Built-In Captions',
                description: 'Auto-generated captions with multi-language support',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white border border-gray-300 rounded-xl p-8 hover:shadow-md transition-shadow">
                <feature.icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four simple steps from idea to publication
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              title: 'Write Your Concept',
              description: 'Describe the video you want to create',
            },
            {
              step: 2,
              title: 'AI Generates Script',
              description: 'Our AI writes a professional script',
            },
            {
              step: 3,
              title: 'Generate Media',
              description: 'Audio, images, and captions are created',
            },
            {
              step: 4,
              title: 'Download Video',
              description: 'Get your polished video ready to share',
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
              {i < 3 && (
                <ArrowRight className="w-5 h-5 text-gray-300 mt-6 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bg-blue-50 border-y border-blue-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Create?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start creating professional videos today. No credit card required.
          </p>
          <Button size="lg">
            <Link href="/sign-up">Get Started Free</Link>
          </Button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">VideoAI</h3>
              <p className="text-sm text-gray-400">
                Create professional videos with AI
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <p className="text-center text-sm text-gray-400">
              © 2024 VideoAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
