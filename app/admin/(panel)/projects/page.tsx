import dbConnect from '@/lib/mongodb'
import Project from '@/lib/models/Project'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlusCircle, Pencil, ExternalLink } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DeleteProjectBtn from './_components/DeleteProjectBtn'

async function getProjects() {
  try {
    await dbConnect()
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean()
    return { projects, dbError: false }
  } catch {
    return { projects: [], dbError: true }
  }
}

export default async function AdminProjectsPage() {
  const { projects, dbError } = await getProjects()

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">My Projects</h1>
          <p className="mt-1 text-sm text-slate-400">
            {projects.length} project(s) registered in your MongoDB database
          </p>
        </div>
        <Button asChild className="bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-slate-950 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20">
          <Link href="/admin/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Project
          </Link>
        </Button>
      </div>

      {/* Table */}
      {dbError ? (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-amber-300">
          <h2 className="text-lg font-bold mb-1">Database Connection Notice</h2>
          <p className="text-sm text-slate-300">
            Could not connect to MongoDB. Please update <code className="bg-slate-950 px-2 py-0.5 rounded text-cyan-400">.env.local</code> with your actual MongoDB connection URI.
          </p>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 py-20 text-center space-y-3">
          <p className="text-xl font-bold text-slate-300">No projects found</p>
          <p className="text-sm text-slate-500">Get started by creating your first portfolio project</p>
          <Button asChild className="mt-2 bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400">
            <Link href="/admin/projects/new">Add Project</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md overflow-hidden shadow-xl">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800/80 hover:bg-transparent">
                <TableHead className="text-slate-400 font-bold text-xs uppercase tracking-wider">Title</TableHead>
                <TableHead className="text-slate-400 font-bold text-xs uppercase tracking-wider">Technologies</TableHead>
                <TableHead className="text-slate-400 font-bold text-xs uppercase tracking-wider">Created</TableHead>
                <TableHead className="text-right text-slate-400 font-bold text-xs uppercase tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => {
                const p = project as {
                  _id: { toString: () => string }
                  title?: string
                  tech?: string[]
                  createdAt?: Date
                  slug?: string
                }
                return (
                  <TableRow
                    key={p._id.toString()}
                    className="border-slate-800/60 hover:bg-slate-800/40 transition-colors"
                  >
                    <TableCell className="font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <span>{p.title}</span>
                        {p.slug && (
                          <Link
                            href={`/projects/${p.slug}`}
                            target="_blank"
                            className="text-slate-500 hover:text-cyan-400 transition-colors"
                            title="View on site"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {(p.tech || []).slice(0, 3).map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs px-2 py-0.5 rounded-lg"
                          >
                            {t}
                          </Badge>
                        ))}
                        {(p.tech || []).length > 3 && (
                          <Badge variant="secondary" className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-lg">
                            +{(p.tech || []).length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          <Link href={`/admin/projects/${p._id.toString()}/edit`}>
                            <Pencil className="mr-1 h-3.5 w-3.5" />
                            Edit
                          </Link>
                        </Button>
                        <DeleteProjectBtn id={p._id.toString()} title={p.title || ''} />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
