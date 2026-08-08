import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-900 bg-slate-950/40 py-12 px-6 text-slate-500 relative overflow-hidden">
      {/* Soft footer glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 h-64 w-full max-w-5xl bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-indigo-500/5 via-cyan-500/0 to-transparent blur-3xl opacity-50" />

      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand/Logo Column */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <Logo />
          <p className="text-[11px] text-slate-500 max-w-xs text-center md:text-left mt-1">
            Designing and building high-performance AI automations and robust data systems.
          </p>
        </div>

        {/* Links & Details Column */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-xs font-semibold text-slate-400">
          <div className="flex gap-6">
            <Link href="/" className="hover:text-cyan-400 transition-colors duration-300">
              Home
            </Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors duration-300">
              About
            </Link>
            <Link href="/projects" className="hover:text-cyan-400 transition-colors duration-300">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors duration-300">
              Contact
            </Link>
          </div>

          <span className="hidden sm:inline text-slate-800">|</span>

          <Link
            href="/admin"
            className="hover:text-cyan-400 transition-colors duration-300 flex items-center gap-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
            Admin Portal
          </Link>
        </div>
      </div>

      {/* Copyright row */}
      <div className="mx-auto max-w-6xl border-t border-slate-900/60 mt-8 pt-6 text-center text-[10px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {currentYear} AHMED CH. All rights reserved.</p>
        <p className="font-mono text-slate-700">
          Built with Next.js, Tailwind CSS &amp; MongoDB
        </p>
      </div>
    </footer>
  )
}
