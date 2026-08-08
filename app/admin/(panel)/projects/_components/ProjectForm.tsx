'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Loader2, Plus } from 'lucide-react'

interface ProjectData {
  id: string
  title: string
  description: string
  details: string
  image: string
  tech: string[]
}

interface ProjectFormProps {
  mode: 'create' | 'edit'
  project?: ProjectData
}

export default function ProjectForm({ mode, project }: ProjectFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(project?.title || '')
  const [description, setDescription] = useState(project?.description || '')
  const [details, setDetails] = useState(project?.details || '')
  const [image, setImage] = useState(project?.image || '')
  const [tech, setTech] = useState<string[]>(project?.tech || [])
  const [techInput, setTechInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function addTech() {
    const trimmed = techInput.trim()
    if (trimmed && !tech.includes(trimmed)) {
      setTech([...tech, trimmed])
      setTechInput('')
    }
  }

  function removeTech(tag: string) {
    setTech(tech.filter((t) => t !== tag))
  }

  function handleTechKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTech()
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload =
      mode === 'edit'
        ? { id: project?.id, title, description, details, image, tech }
        : { title, description, details, image, tech }

    try {
      const res = await fetch('/api/projects', {
        method: mode === 'edit' ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      })

      if (res.ok) {
        router.push('/admin/projects')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save project')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-slate-800/80 bg-slate-900/60 backdrop-blur-md shadow-2xl rounded-3xl max-w-3xl">
      <CardContent className="pt-8 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-300 font-bold text-xs uppercase tracking-wider">
              Project Title <span className="text-red-400">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. n8n Email Automation System"
              required
              className="border-slate-800 bg-slate-950/80 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300 font-bold text-xs uppercase tracking-wider">
              Short Description <span className="text-red-400">*</span>
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="One-line summary shown on the project card"
              required
              className="border-slate-800 bg-slate-950/80 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
            />
          </div>

          {/* Details */}
          <div className="space-y-2">
            <Label htmlFor="details" className="text-slate-300 font-bold text-xs uppercase tracking-wider">
              Detailed Overview
            </Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Full project description, workflows, triggers, and architecture..."
              rows={5}
              className="border-slate-800 bg-slate-950/80 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl resize-none"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-slate-300 font-bold text-xs uppercase tracking-wider">
              Cover Image URL
            </Label>
            <Input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://raw.githubusercontent.com/..."
              className="border-slate-800 bg-slate-950/80 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
            />
            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt="Preview"
                className="mt-3 h-40 w-full rounded-2xl object-cover border border-slate-800 bg-slate-950"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            )}
          </div>

          {/* Tech Tags */}
          <div className="space-y-2">
            <Label className="text-slate-300 font-bold text-xs uppercase tracking-wider">Technologies &amp; Tools</Label>
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                placeholder="Type a technology (e.g. n8n, OpenAI) and press Enter"
                className="border-slate-800 bg-slate-950/80 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
              />
              <Button
                type="button"
                onClick={addTech}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tech.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 gap-1 pl-3 pr-1.5 py-1 rounded-xl"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTech(tag)}
                      className="ml-1 rounded-full p-0.5 hover:bg-cyan-500/30 text-cyan-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <Button
              type="submit"
              disabled={loading || !title || !description}
              className="bg-gradient-to-r from-cyan-500 to-indigo-600 font-bold text-slate-950 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 rounded-xl px-6 py-2.5 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : mode === 'edit' ? (
                'Update Project'
              ) : (
                'Publish Project'
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push('/admin/projects')}
              className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
