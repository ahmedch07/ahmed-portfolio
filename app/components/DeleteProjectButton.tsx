'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleDelete() {
    if (!confirm('Delete this project?')) return
    setLoading(true)
    setError('')
    try {
      const headers: any = { 'Content-Type': 'application/json' }
      if (process.env.NEXT_PUBLIC_ADMIN_SECRET) headers['x-admin-secret'] = process.env.NEXT_PUBLIC_ADMIN_SECRET
      const res = await fetch('/api/projects', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Delete failed')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleDelete} disabled={loading} className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-300 hover:bg-white/10 disabled:opacity-50">
        {loading ? 'Deleting...' : 'Delete'}
      </button>
      {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
    </div>
  )
}
