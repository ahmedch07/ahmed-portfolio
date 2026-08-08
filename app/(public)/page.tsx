import Link from "next/link";
import { Sparkles, ArrowRight, Bot, Cpu, Workflow, ShieldCheck } from "lucide-react";

const contactLinks = [
  { label: "GitHub", href: "https://github.com/ahmedch07" },
  { label: "Fiverr", href: "https://www.fiverr.com/s/bd40Q3a" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~01394e72a494260d10?mp_source=share" },
  { label: "Email", href: "mailto:ahmedch8990@gmail.com" },
  { label: "Phone", href: "tel:+923411003874" },
  { label: "Location", href: "https://www.google.com/maps/search/Pakistan" },
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 pt-36 pb-20 flex flex-col items-center justify-center gap-12 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-4xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-sm shadow-cyan-500/10">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
          <span>AI Automation &amp; n8n Specialist</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Hi, I&apos;m <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">AHMED CH</span>
        </h1>

        <p className="text-lg sm:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
          I design &amp; deploy intelligent AI agents, n8n workflow automations, customer chatbots, and custom API integrations for businesses
          worldwide.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-medium text-slate-300">
            <Bot className="h-4 w-4 text-cyan-400" /> AI Autonomous Agents
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-medium text-slate-300">
            <Workflow className="h-4 w-4 text-indigo-400" /> n8n Workflows
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-medium text-slate-300">
            <Cpu className="h-4 w-4 text-teal-400" /> Custom API Pipelines
          </span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link
          href="/projects"
          className="group flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-8 py-4 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 hover:shadow-cyan-500/40"
        >
          View My Projects
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/admin"
          className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-full border border-slate-700 bg-slate-900/60 backdrop-blur-md px-8 py-4 text-slate-200 font-semibold transition-all hover:border-cyan-400 hover:bg-slate-800 hover:text-white"
        >
          <ShieldCheck className="h-4 w-4 text-cyan-400" />
          Admin Panel
        </Link>
      </div>

      {/* Quick Contact Card */}
      <div className="w-full max-w-3xl rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md p-8 shadow-2xl shadow-slate-950/80 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest font-semibold text-cyan-400">Direct Contacts &amp; Profiles</p>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-slate-800 bg-slate-950/80 px-5 py-4 text-center text-sm font-semibold text-slate-200 transition-all hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5"
            >
              <span className="group-hover:text-cyan-300 transition-colors">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
