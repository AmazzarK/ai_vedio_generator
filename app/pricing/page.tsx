'use client'

import { useState } from 'react'
import { Check, Zap, Crown, Building2, ArrowLeft } from 'lucide-react'
import { PLANS } from '@/configs/plans'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()
  const { isSignedIn } = useUser()

  const handleSubscribe = async (planId: string) => {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }

    if (planId === 'free') {
      router.push('/dashboard')
      return
    }

    setLoading(planId)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, billingCycle }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    { ...PLANS.FREE, icon: Zap, gradient: 'from-gray-600 to-gray-800' },
    { ...PLANS.PRO, icon: Crown, gradient: 'from-[#7C3AED] to-[#00E7FF]' },
    { ...PLANS.ENTERPRISE, icon: Building2, gradient: 'from-[#00E7FF] to-[#7C3AED]' },
  ]

  return (
    <div className="min-h-screen bg-[#0F0F12] text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-[#7C3AED] to-[#00E7FF] bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Unlock the full potential of AI video generation
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-[#16161B] rounded-full p-2 border border-[#7C3AED]/20">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-linear-to-r from-[#7C3AED] to-[#00E7FF] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-linear-to-r from-[#7C3AED] to-[#00E7FF] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly
            const isPopular = 'popular' in plan && plan.popular

            return (
              <div
                key={plan.id}
                className={`relative bg-[#16161B] rounded-2xl p-8 border transition-all hover:scale-105 ${
                  isPopular
                    ? 'border-[#7C3AED] shadow-2xl shadow-[#7C3AED]/20'
                    : 'border-[#7C3AED]/20'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#7C3AED] to-[#00E7FF] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${plan.gradient} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-2">{plan.name.en}</h3>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">${price}</span>
                    <span className="text-gray-400 ml-2">
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && price > 0 && (
                    <p className="text-sm text-green-400 mt-1">
                      ${(price / 12).toFixed(2)}/month billed annually
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.en.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#00E7FF] shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                  className={`w-full py-4 rounded-xl font-semibold transition-all ${
                    isPopular
                      ? 'bg-linear-to-r from-[#7C3AED] to-[#00E7FF] hover:opacity-90'
                      : 'bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 border border-[#7C3AED]/50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.id ? 'Loading...' : plan.id === 'free' ? 'Get Started' : 'Subscribe Now'}
                </button>
              </div>
            )
          })}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-20 text-center">
          <p className="text-gray-400">
            Need a custom plan? <a href="mailto:support@example.com" className="text-[#00E7FF] hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  )
}
