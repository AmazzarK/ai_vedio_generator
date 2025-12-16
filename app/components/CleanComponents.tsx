/**
 * CLEAN REACT COMPONENTS - EXAMPLE IMPLEMENTATIONS
 * 
 * Copy these patterns for consistent, modern UI
 */

'use client'

import React from 'react'
import { 
  ChevronDown, 
  AlertCircle, 
  CheckCircle2,
  Play,
  Plus,
  Loader2
} from 'lucide-react'

// ===== REUSABLE COMPONENTS =====

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  icon: Icon,
  onClick,
  className = '',
  ...props
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  isLoading?: boolean
  icon?: React.ComponentType<any>
  onClick?: () => void
  className?: string
  [key: string]: any
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    secondary: 'border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    tertiary: 'text-blue-600 bg-transparent hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  )
}

export function Input({
  label,
  helperText,
  error,
  required = false,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  helperText?: string
  error?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      {label && (
        <label className="text-sm font-medium text-gray-900">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <input
        className={`px-4 py-2.5 bg-white border rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        } ${props.disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
        {...props}
      />
      {helperText && !error && (
        <span className="text-xs text-gray-600">{helperText}</span>
      )}
      {error && (
        <span className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </span>
      )}
    </div>
  )
}

export function Card({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-white border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  title,
  description,
  children,
  className = '',
}: {
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`mb-6 pb-6 border-b border-gray-200 ${className}`}>
      {title && <h3 className="text-xl font-semibold text-gray-900">{title}</h3>}
      {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      {children}
    </div>
  )
}

export function CardFooter({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex gap-3 pt-6 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

export function Select({
  label,
  options,
  value,
  onChange,
  helperText,
  error,
  required = false,
  ...props
}: {
  label?: string
  options: Array<{ value: string | number; label: string }>
  value?: string | number
  onChange?: (value: string | number) => void
  helperText?: string
  error?: string
  required?: boolean
  [key: string]: any
}) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      {label && (
        <label className="text-sm font-medium text-gray-900">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full px-4 py-2.5 bg-white border rounded-lg text-base appearance-none transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
      </div>
      {helperText && !error && (
        <span className="text-xs text-gray-600">{helperText}</span>
      )}
      {error && (
        <span className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </span>
      )}
    </div>
  )
}

export function Badge({
  children,
  variant = 'primary',
  className = '',
}: {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'error'
  className?: string
}) {
  const variants = {
    primary: 'bg-blue-100 text-blue-700 border border-blue-300',
    success: 'bg-green-100 text-green-700 border border-green-300',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    error: 'bg-red-100 text-red-700 border border-red-300'
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export function Alert({
  variant = 'info',
  title,
  children,
  onDismiss,
  className = '',
}: {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children: React.ReactNode
  onDismiss?: () => void
  className?: string
}) {
  const variants = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-800',
      icon: 'text-blue-600',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-300',
      text: 'text-green-800',
      icon: 'text-green-600',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      text: 'text-yellow-800',
      icon: 'text-yellow-600',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      text: 'text-red-800',
      icon: 'text-red-600',
    },
  }

  const config = variants[variant]
  const Icon = variant === 'success' ? CheckCircle2 : AlertCircle

  return (
    <div className={`${config.bg} border ${config.border} rounded-lg p-4 flex gap-3 ${className}`}>
      <Icon className={`w-5 h-5 ${config.icon} shrink-0 mt-0.5`} />
      <div className={`flex-1 ${config.text}`}>
        {title && <p className="font-medium">{title}</p>}
        <p className="text-sm mt-1">{children}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export function Tab({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: Array<{ id: string; label: string }>
  activeTab: string
  onTabChange: (id: string) => void
}) {
  return (
    <div className="flex border-b border-gray-300">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-3 font-medium text-sm transition-colors relative ${
            activeTab === tab.id
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
      ))}
    </div>
  )
}

// ===== COMPLEX COMPONENT: VIDEO GENERATION FORM =====

export function VideoGenerationForm() {
  const [formData, setFormData] = React.useState({
    prompt: '',
    platform: 'youtube',
    duration: '30s',
  })
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setStatus('idle')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader
        title="Generate Video"
        description="Describe your video idea and let AI create it"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Video Concept"
          placeholder="e.g., Explain React hooks in 30 seconds"
          value={formData.prompt}
          onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
          helperText="Be specific about what you want to create"
          required
        />

        <Select
          label="Platform"
          options={[
            { value: 'youtube', label: 'YouTube (16:9)' },
            { value: 'tiktok', label: 'TikTok (9:16)' },
            { value: 'instagram', label: 'Instagram (1:1)' },
          ]}
          value={formData.platform}
          onChange={(value) => setFormData({ ...formData, platform: value as string })}
          helperText="Aspect ratio will be adjusted automatically"
          required
        />

        <Select
          label="Video Duration"
          options={[
            { value: '15s', label: '15 seconds' },
            { value: '30s', label: '30 seconds' },
            { value: '60s', label: '1 minute' },
          ]}
          value={formData.duration}
          onChange={(value) => setFormData({ ...formData, duration: value as string })}
          required
        />

        {status === 'success' && (
          <Alert variant="success" title="Success!">
            Your video has been generated successfully.
          </Alert>
        )}

        {status === 'error' && (
          <Alert variant="error" title="Error">
            Something went wrong. Please try again.
          </Alert>
        )}

        <CardFooter className="flex-row-reverse">
          <Button
            type="submit"
            isLoading={isGenerating}
            disabled={!formData.prompt || isGenerating}
          >
            <Play className="w-4 h-4" />
            Generate Video
          </Button>
          <Button variant="tertiary">
            Save Draft
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default VideoGenerationForm
