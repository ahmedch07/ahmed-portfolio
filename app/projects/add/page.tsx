'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddProjectPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [tech, setTech] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const headers: any = { 'Content-Type': 'application/json' }
      if (process.env.NEXT_PUBLIC_ADMIN_SECRET) headers['x-admin-secret'] = process.env.NEXT_PUBLIC_ADMIN_SECRET
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, image, description, tech }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      router.push('/projects')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-8 pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6">Add Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3" />
          </div>

          <div>
            <label className="block text-sm text-gray-400">Image URL</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3" />
          </div>

          <div>
            <label className="block text-sm text-gray-400">Short Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3" rows={4} />
          </div>

          <div>
            <label className="block text-sm text-gray-400">Tech (comma separated)</label>
            <input value={tech} onChange={(e) => setTech(e.target.value)} className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3" />
          </div>

          {error && <div className="text-red-400">{error}</div>}

          <div>
            <button type="submit" disabled={loading} className="rounded-full bg-cyan-500 px-6 py-3 text-black font-semibold">
              {loading ? 'Adding...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
