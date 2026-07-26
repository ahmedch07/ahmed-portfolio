import Link from 'next/link';

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/ahmedch07',
  },
  {
    label: 'Fiverr',
    href: 'https://www.fiverr.com/s/bd40Q3a',
  },
  {
    label: 'Upwork',
    href: 'https://www.upwork.com/freelancers/~01394e72a494260d10?mp_source=share',
  },
  {
    label: 'Email',
    href: 'mailto:ahmedch8990@gmail.com',
  },
  {
    label: 'Phone',
    href: 'tel:+923411003874',
  },
  {
    label: 'Location',
    href: 'https://www.google.com/maps/search/Pakistan',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-8 pt-32 pb-20 flex flex-col items-center justify-center gap-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-cyan-400">Hi, I'm AHMED CH</h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-300">
          AI Automation & n8n Specialist
        </p>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          I build AI agents, workflow automations, chatbots, and intelligent integrations for businesses.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link href="/projects" className="rounded-full bg-cyan-500 px-8 py-4 text-black font-semibold transition hover:bg-cyan-400">
          View Projects
        </Link>
        <Link href="/contact" className="rounded-full border border-cyan-500 px-8 py-4 text-cyan-400 transition hover:bg-white/10">
          Contact Me
        </Link>
      </div>

      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-800 bg-gray-950 p-8 shadow-xl shadow-cyan-500/10">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-400">Quick contact</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-gray-800 bg-black/80 px-5 py-4 text-center text-sm font-semibold text-white transition hover:border-cyan-400 hover:bg-gray-900"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
