import { db } from '@/configs/db'
import { Users } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, name, email, imageUrl } = body

    if (!id || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: id, email' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.id, id))

    if (existingUser.length === 0) {
      // Create new user
      await db.insert(Users).values({
        id,
        name: name || 'User',
        email,
        imageUrl: imageUrl || '',
        subscription: false,
      })

      return NextResponse.json({
        success: true,
        message: 'User created successfully',
        isNew: true,
      })
    }

    // User already exists
    return NextResponse.json({
      success: true,
      message: 'User already exists',
      isNew: false,
    })
  } catch (error) {
    console.error('Error syncing user:', error)
    return NextResponse.json(
      { error: 'Failed to sync user', details: error },
      { status: 500 }
    )
  }
}
