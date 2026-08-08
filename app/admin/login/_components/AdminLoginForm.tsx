'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Loader2, User, ShieldCheck } from 'lucide-react'

export default function AdminLoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Invalid credentials')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-slate-800/80 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-slate-950/90 rounded-3xl p-2">
      <CardHeader className="space-y-2 text-center pb-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-slate-950 shadow-lg shadow-cyan-500/20">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <CardTitle className="text-2xl font-extrabold text-white tracking-tight">Admin Portal</CardTitle>
        <CardDescription className="text-slate-400 text-sm">
          Enter your admin credentials to access the panel
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-slate-300 text-xs font-bold uppercase tracking-wider">
              Username or Email
            </Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder="admin@ahmed.com or admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-slate-800 bg-slate-950/80 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 pl-10 rounded-xl"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300 text-xs font-bold uppercase tracking-wider">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-slate-800 bg-slate-950/80 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 pr-10 rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 font-bold text-slate-950 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 rounded-xl py-5 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
