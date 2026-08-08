import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_token'
const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-secret-change-in-production'
)

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload.role === 'admin'
  } catch {
    return false
  }
}

export async function getAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return false
    return verifyAdminToken(token)
  } catch {
    return false
  }
}

export async function verifyAdminSession(request?: Request): Promise<boolean> {
  const hasSession = await getAdminSession()
  if (hasSession) return true

  if (request) {
    const cookieHeader = request.headers.get('cookie') || ''
    const match = cookieHeader.match(new RegExp(`(?:^|; )\\s*${COOKIE_NAME}=([^;]+)`))
    if (match) return verifyAdminToken(match[1])
  }

  return false
}

export { COOKIE_NAME }
