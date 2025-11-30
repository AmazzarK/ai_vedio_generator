'use client'

import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0a0f] via-[#0F0F12] to-[#1a1a24] grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      {/* Sophisticated Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Main ambient light */}
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-[#7C3AED]/20 rounded-full blur-[200px] opacity-40" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#00E7FF]/15 rounded-full blur-[180px] opacity-30" />
        
        {/* Subtle accent lights */}
        <div className="absolute top-0 left-1/3 w-[300px] h-[300px] bg-[#00E7FF]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] bg-[#7C3AED]/15 rounded-full blur-[150px]" />
      </div>

      {/* Left Side - Image with sophisticated overlay */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-black/40 via-transparent to-black/60 z-10" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-10" />
        
        <Image
          src="/login.png"
          alt="AIVideoGen"
          fill
          className="object-cover scale-105"
          priority
        />
      </div>

      {/* Right Side - Premium Form Container */}
      <div className="relative flex flex-col justify-center items-center p-8 md:p-12 lg:p-20">
        {/* Image-inspired gradient background with electric glow */}
        <div className="absolute inset-0 bg-linear-to-br from-[#06040a] via-[#0d0615] to-[#08050f]" />
        
        {/* Electric purple glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#7C3AED] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-[#00E7FF] rounded-full blur-[100px] opacity-15 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        </div>
        
        {/* Minimal noise texture */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(124, 58, 237, 0.15) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>
        
        <div className="w-full max-w-[440px] relative z-10">
          {/* Clerk Sign Up Component with refined styling */}
          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-[#1e1433]/40 backdrop-blur-xl shadow-[0_8px_40px_rgba(124,58,237,0.15)] border border-[#7C3AED]/20 rounded-3xl p-8',
                
                // Header
                headerTitle: 'text-white text-3xl font-bold tracking-tight mb-2',
                headerSubtitle: 'text-gray-400/90 text-base font-normal',
                
                // Social buttons
                socialButtonsBlockButton:
                  'bg-[#1a1625]/80 border border-[#7C3AED]/30 hover:bg-[#1a1625] hover:border-[#7C3AED]/60 hover:shadow-lg hover:shadow-[#7C3AED]/20 text-white transition-all duration-200 rounded-xl h-12 font-medium text-[15px]',
                socialButtonsBlockButtonText: 'text-white/90 font-medium',
                socialButtonsBlockButtonArrow: 'text-gray-500',
                
                // Primary button
                formButtonPrimary:
                  'bg-gradient-to-r from-[#5a2a9e] via-[#7C3AED] to-[#9D4EDD] hover:from-[#6b3bb3] hover:via-[#8b4afe] hover:to-[#b062ff] shadow-lg shadow-[#7C3AED]/30 hover:shadow-xl hover:shadow-[#7C3AED]/50 transition-all duration-200 rounded-xl h-12 text-white font-semibold text-[15px]',
                
                // Input fields
                formFieldInput:
                  'bg-[#1a1625]/80 border border-[#7C3AED]/30 text-white placeholder:text-gray-500 focus:bg-[#1a1625] focus:border-[#7C3AED]/60 focus:ring-2 focus:ring-[#7C3AED]/20 focus:shadow-lg focus:shadow-[#7C3AED]/10 rounded-xl h-12 px-4 transition-all duration-200 text-[15px]',
                formFieldLabel: 'text-gray-300 font-medium text-sm mb-2',
                
                // Footer links
                footerActionLink: 'text-[#7C3AED] hover:text-[#00E7FF] transition-colors font-medium text-sm',
                footerActionText: 'text-gray-400 text-sm',
                
                // Other elements
                identityPreviewText: 'text-white text-sm',
                identityPreviewEditButton: 'text-[#7C3AED] hover:text-[#00E7FF] text-sm',
                formFieldInputShowPasswordButton: 'text-gray-400 hover:text-white transition-colors',
                
                // Divider
                dividerLine: 'bg-[#7C3AED]/20',
                dividerText: 'text-gray-500 text-xs uppercase tracking-wider font-medium',
                
                // Additional refinements
                formHeaderTitle: 'text-white font-semibold text-lg',
                formHeaderSubtitle: 'text-gray-400 text-sm',
                otpCodeFieldInput: 'bg-[#1a1625]/60 border-[#7C3AED]/20 text-white focus:border-[#7C3AED]/50 rounded-lg h-12',
                formResendCodeLink: 'text-[#7C3AED] hover:text-[#00E7FF] font-medium text-sm',
                identityPreviewEditButtonIcon: 'text-[#7C3AED]',
                
                // Alert styling
                alert: 'bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl',
                alertText: 'text-red-200 text-sm',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}