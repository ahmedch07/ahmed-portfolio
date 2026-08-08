import { NextResponse } from 'next/server'
import { signAdminToken, COOKIE_NAME } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Admin from '@/lib/models/Admin'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password } = body

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    let isValid = false

    // 1. Try DB authentication
    try {
      await dbConnect()
      const query = username ? username.trim().toLowerCase() : ''
      const admin = await Admin.findOne(
        query
          ? { $or: [{ username: query }, { email: query }] }
          : {}
      )

      if (admin && admin.passwordHash) {
        isValid = await bcrypt.compare(password, admin.passwordHash)
      }
    } catch {
      // If DB fails or unconfigured, fallback to env check
    }

    // 2. Fallback to ADMIN_SECRET env variable
    if (!isValid && process.env.ADMIN_SECRET && password === process.env.ADMIN_SECRET) {
      isValid = true
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
    }

    const token = await signAdminToken()

    const response = NextResponse.json({ ok: true })
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return response
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
