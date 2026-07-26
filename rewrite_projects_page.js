const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'app', 'projects', 'page.tsx');
const content = [
  "import projects from '../projects.json';",
  "import Link from 'next/link';",
  '',
  'export default function ProjectsPage() {',
  '  return (',
  '    <main className="min-h-screen bg-black text-white px-8 pt-32 pb-20">',
  '      <h1 className="text-5xl font-bold text-center mb-4 text-cyan-400">My Projects</h1>',
  '      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">',
  '        {projects.map((project) => (',
  '          <Link',
  '            key={project.id}',
  '            href={`/projects/${project.id}`}',
  '            className="group block rounded-xl border border-gray-800 bg-gray-900 p-6 transition hover:border-cyan-400 hover:bg-gray-800"',
  '          >',
  '            <h3 className="text-2xl font-bold text-cyan-400 group-hover:text-white">{project.title}</h3>',
  '            <p className="mt-3 text-gray-300">{project.description}</p>',
  '            <div className="mt-4 text-cyan-400 group-hover:text-cyan-200">View details →</div>',
  '          </Link>',
  '        ))}',
  '        <div className="flex items-center justify-center rounded-xl border border-dashed border-cyan-500 bg-gray-950 p-6">',
  '          <Link href="/projects/add" className="rounded-full bg-cyan-500 px-8 py-4 text-black font-semibold">Add Project</Link>',
  '        </div>',
  '      </div>',
  '',
  '      <div className="text-center mt-10">',
  '        <Link href="/" className="inline-flex rounded-full border border-cyan-500 bg-transparent px-8 py-4 text-cyan-400 text-lg font-semibold transition hover:bg-white/10">← Back to Home</Link>',
  '      </div>',
  '    </main>',
  '  )',
  '}',
].join('\n');
fs.writeFileSync(filePath, content, 'utf8');
console.log('rewritten projects page');
