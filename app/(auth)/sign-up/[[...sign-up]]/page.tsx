'use client'

import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100 dark:bg-blue-950/30 rounded-full blur-3xl opacity-10 dark:opacity-20" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-5 dark:opacity-10" />
      </div>

      {/* Left Side - Content section */}
      <div className="relative h-screen hidden md:flex flex-col justify-center items-center p-12 bg-linear-to-br from-blue-50 dark:from-gray-900 to-white dark:to-gray-950">
        <div className="max-w-md space-y-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                V
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">VideoAI</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Get started free</p>
          </div>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Create Your VideoAI Account</h3>
              <p className="text-gray-600 dark:text-gray-400">Join thousands of creators generating videos with AI</p>
            </div>
          </div>
          <div className="space-y-3 pt-8">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center text-xs font-bold mt-1 shrink-0">✓</div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">Free to start</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">100 tokens per month on our free plan</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center text-xs font-bold mt-1 shrink-0">✓</div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">No credit card required</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Create an account and start generating videos immediately</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center text-xs font-bold mt-1 shrink-0">✓</div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">Upgrade anytime</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Scale up to Pro or Enterprise as your needs grow</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="relative flex flex-col justify-center items-center p-8 md:p-12 lg:p-20 bg-white dark:bg-gray-950">
        {/* Subtle background accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 dark:opacity-30 -mr-32 -mt-32" />
        </div>
        
        <div className="w-full max-w-md relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold">
              V
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">VideoAI</span>
          </Link>
          {/* Clerk Sign Up Component with light theme styling */}
          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-white dark:bg-gray-900 shadow-none border-none rounded-2xl p-0',
                
                // Header
                headerTitle: 'text-gray-900 dark:text-white text-2xl font-bold tracking-tight mb-1',
                headerSubtitle: 'text-gray-600 dark:text-gray-400 text-sm font-normal mb-6',
                
                // Social buttons
                socialButtonsBlockButton:
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-white transition-all duration-200 rounded-lg h-11 font-medium text-sm',
                socialButtonsBlockButtonText: 'text-gray-900 dark:text-white font-medium',
                socialButtonsBlockButtonArrow: 'text-gray-400 dark:text-gray-500',
                
                // Primary button
                formButtonPrimary:
                  'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 shadow-lg shadow-blue-500/20 dark:shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-900/50 transition-all duration-200 rounded-lg h-11 text-white font-semibold text-sm',
                
                // Input fields
                formFieldInput:
                  'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 rounded-lg h-11 px-4 transition-all duration-200 text-sm',
                formFieldLabel: 'text-gray-700 dark:text-gray-300 font-medium text-sm mb-2',
                
                // Footer links
                footerActionLink: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium text-sm',
                footerActionText: 'text-gray-600 dark:text-gray-400 text-sm',
                
                // Other elements
                identityPreviewText: 'text-gray-900 dark:text-white text-sm',
                identityPreviewEditButton: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm',
                formFieldInputShowPasswordButton: 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors',
                
                // Divider
                dividerLine: 'bg-gray-200 dark:bg-gray-800',
                dividerText: 'text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider font-medium',
                
                // Additional refinements
                formHeaderTitle: 'text-gray-900 dark:text-white font-semibold text-lg',
                formHeaderSubtitle: 'text-gray-600 dark:text-gray-400 text-sm',
                otpCodeFieldInput: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-500 rounded-lg h-11',
                formResendCodeLink: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm',
                identityPreviewEditButtonIcon: 'text-blue-600 dark:text-blue-400',
                
                // Alert styling
                alert: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-400 rounded-lg',
                alertText: 'text-red-900 dark:text-red-400 text-sm',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}