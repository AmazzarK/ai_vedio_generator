'use client'

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState, createContext, useContext } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    setMounted(true)
  }, [])

  useEffect(() => {
    if (user && mounted) {
      isNewUser()
    }
  }, [user, mounted])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const isNewUser = async () => {
    if (!user) return

    try {
      // Validate user data
      if (!user.id) {
        console.error('❌ User ID is missing');
        return;
      }

      if (!user.emailAddresses || user.emailAddresses.length === 0) {
        console.error('❌ User email is missing');
        return;
      }

      const userEmail = user.emailAddresses[0]?.emailAddress;
      if (!userEmail) {
        console.error('❌ Valid email address not found');
        return;
      }

      // Call API route to check/create user
      const response = await fetch('/api/user/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          name: user.fullName || 'User',
          email: userEmail,
          imageUrl: user.imageUrl || '',
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error('❌ User sync failed:', data.error || 'Unknown error')
        return;
      }

      console.log('✅ User synced successfully:', data)
    } catch (error) {
      console.error('❌ Error syncing user:', error)
    }
  }

  // Always render children - theme is managed at the document level, not via context
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default Provider
export { useTheme }