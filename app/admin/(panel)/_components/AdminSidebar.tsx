'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FolderKanban, PlusCircle, LogOut, Globe, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'My Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Add Project', href: '/admin/projects/new', icon: PlusCircle },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800/80 bg-slate-950 p-6">
      {/* Brand Header */}
      <div className="mb-8 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-white tracking-tight leading-tight">Ahmed CH</h2>
            <p className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">Admin Control</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-1 flex-col gap-1.5">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Management
        </div>

        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 border border-cyan-500/30 text-cyan-300 shadow-md shadow-cyan-500/5'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              {label}
            </Link>
          )
        })}

        <div className="mt-6 px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Public Site
        </div>
        <Link
          href="/projects"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-all"
        >
          <Globe className="h-4 w-4 text-slate-400" />
          View Live Site ↗
        </Link>
      </nav>

      {/* Footer / Logout */}
      <div className="mt-auto border-t border-slate-800/80 pt-4 space-y-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs">
            AC
          </div>
          <div className="overflow-hidden text-xs">
            <p className="font-semibold text-slate-200 truncate">Administrator</p>
            <p className="text-slate-500 text-[10px] truncate">MongoDB Connected</p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
