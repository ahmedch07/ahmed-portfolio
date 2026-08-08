'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { ShieldCheck, Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 py-3 shadow-xl shadow-slate-950/50">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative group py-1.5 hover:text-cyan-400 transition-colors duration-300"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Admin Badge link */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/20 transition-all shadow-sm shadow-cyan-500/10"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-slate-800/60 flex flex-col gap-4 text-sm font-medium text-slate-300 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-cyan-400 py-1 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 py-2.5 text-xs font-semibold text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/20 transition-all"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin Panel
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
