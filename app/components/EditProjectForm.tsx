'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type EditProjectFormProps = {
  project: {
    id: string
    title: string
    image: string
    description: string
    details: string
    tech: string[]
  }
}

export default function EditProjectForm({ project }: EditProjectFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(project.title)
  const [image, setImage] = useState(project.image)
  const [description, setDescription] = useState(project.description)
  const [details, setDetails] = useState(project.details)
  const [tech, setTech] = useState(project.tech.join(', '))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const headers: any = { 'Content-Type': 'application/json' }
      if (process.env.NEXT_PUBLIC_ADMIN_SECRET) headers['x-admin-secret'] = process.env.NEXT_PUBLIC_ADMIN_SECRET
      const res = await fetch('/api/projects', {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          id: project.id,
          title,
          image,
          description,
          details,
          tech,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Update failed')
      router.push(`/projects/${project.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-gray-800 bg-gray-950 p-8 shadow-xl shadow-cyan-500/10">
      <div>
        <label className="block text-sm text-gray-400">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-2xl bg-black border border-gray-800 px-4 py-3" />
      </div>
      <div>
        <label className="block text-sm text-gray-400">Image URL</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} className="mt-2 w-full rounded-2xl bg-black border border-gray-800 px-4 py-3" />
      </div>
      <div>
        <label className="block text-sm text-gray-400">Short Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-2 w-full rounded-2xl bg-black border border-gray-800 px-4 py-3" />
      </div>
      <div>
        <label className="block text-sm text-gray-400">Details</label>
        <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={4} className="mt-2 w-full rounded-2xl bg-black border border-gray-800 px-4 py-3" />
      </div>
      <div>
        <label className="block text-sm text-gray-400">Tech Stack (comma separated)</label>
        <input value={tech} onChange={(e) => setTech(e.target.value)} className="mt-2 w-full rounded-2xl bg-black border border-gray-800 px-4 py-3" />
      </div>
      {error && <div className="text-red-400">{error}</div>}
      <button type="submit" disabled={loading} className="rounded-full bg-cyan-500 px-6 py-3 text-black font-semibold">
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
