import dbConnect from '@/lib/mongodb'
import Project from '@/lib/models/Project'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderKanban, Clock, TrendingUp, PlusCircle, ExternalLink, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function getStats() {
  try {
    await dbConnect()
    const total = await Project.countDocuments()
    const latest = await Project.findOne({}).sort({ createdAt: -1 }).lean()
    return { total, latest, dbError: false }
  } catch {
    return { total: 0, latest: null, dbError: true }
  }
}

export default async function AdminDashboard() {
  const { total, latest, dbError } = await getStats()

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Dashboard Overview</h1>
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">
              Live
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Manage your AI portfolio projects &amp; dynamic MongoDB records
          </p>
        </div>

        <Button asChild className="bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-slate-950 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20">
          <Link href="/admin/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Project
          </Link>
        </Button>
      </div>

      {dbError && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-amber-300 shadow-lg">
          <h2 className="text-lg font-bold mb-1">Database Connection Notice</h2>
          <p className="text-sm text-slate-300">
            Could not connect to MongoDB. Please update <code className="bg-slate-950 px-2 py-0.5 rounded text-cyan-400">.env.local</code> with your actual MongoDB connection URI.
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-slate-800/80 bg-slate-900/60 backdrop-blur-md shadow-xl hover:border-cyan-500/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Projects</CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FolderKanban className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-white tracking-tight">{total}</div>
            <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active in MongoDB Database
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800/80 bg-slate-900/60 backdrop-blur-md shadow-xl hover:border-indigo-500/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">Latest Project</CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Clock className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="truncate text-lg font-bold text-white">
              {latest ? (latest as { title?: string }).title : 'No projects created'}
            </div>
            <p className="mt-2 text-xs text-slate-400">
              {latest
                ? `Added on ${new Date((latest as { createdAt?: Date }).createdAt ?? '').toLocaleDateString()}`
                : 'Click below to create your first project'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800/80 bg-slate-900/60 backdrop-blur-md shadow-xl hover:border-teal-500/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Actions</CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-1">
            <Button asChild size="sm" className="w-full justify-between bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-200 border border-slate-700">
              <Link href="/admin/projects">
                <span>Manage All Projects</span>
                <FolderKanban className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full justify-between border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              <Link href="/projects" target="_blank">
                <span>View Public Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-transparent p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
          <ShieldCheck className="h-5 w-5" />
          <span>MongoDB Integrated Portfolio System</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Everything managed inside this admin panel is synchronized in real-time with your MongoDB database. Any additions, updates, or deletions immediately reflect on your public{' '}
          <Link href="/projects" target="_blank" className="font-semibold text-cyan-400 underline hover:text-cyan-300">
            /projects showcase page
          </Link>.
        </p>
      </div>
    </div>
  )
}
