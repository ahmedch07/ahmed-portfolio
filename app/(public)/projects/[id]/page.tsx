import dbConnect from '@/lib/mongodb'
import Project from '@/lib/models/Project'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Cpu } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params
  let project = null

  try {
    await dbConnect()
    project = await Project.findOne({ slug: id }).lean()
    if (!project) {
      try {
        project = await Project.findById(id).lean()
      } catch {
        // invalid ObjectId
      }
    }
  } catch {
    // db error
  }

  if (!project) notFound()

  const p = project as {
    _id: { toString: () => string }
    slug?: string
    title?: string
    description?: string
    details?: string
    image?: string
    tech?: string[]
  }

  return (
    <main className="min-h-screen px-6 pt-36 pb-24 max-w-5xl mx-auto">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to All Projects
      </Link>

      <article className="rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md p-8 lg:p-12 shadow-2xl shadow-slate-950 space-y-8">
        {/* Title */}
        <div className="space-y-4 border-b border-slate-800/80 pb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {p.title}
          </h1>
          <p className="text-slate-300 text-lg font-light leading-relaxed">
            {p.description}
          </p>
        </div>

        {/* Project Image */}
        {p.image && (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.title || 'Project preview'}
              className="h-auto w-full max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Details & Tech Stack */}
        <div className="grid gap-8 lg:grid-cols-3 pt-4">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Overview &amp; Architecture</span>
            </h2>
            <div className="text-slate-300 text-base leading-relaxed whitespace-pre-line bg-slate-950/50 rounded-2xl p-6 border border-slate-800/60">
              {p.details || p.description}
            </div>
          </div>

          <div className="space-y-6">
            {(p.tech || []).length > 0 && (
              <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-cyan-400" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {(p.tech || []).map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </main>
  )
}
