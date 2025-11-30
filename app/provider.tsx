'use client'

import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      isNewUser()
    }
  }, [user])

  const isNewUser = async () => {
    if (!user) return

    try {
      // Call API route to check/create user
      const response = await fetch('/api/user/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          name: user.fullName || 'User',
          email: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl || '',
        }),
      })

      const data = await response.json()
      console.log('User sync response:', data)
    } catch (error) {
      console.error('Error syncing user:', error)
    }
  }

  return <div>{children}</div>
}

export default Provider