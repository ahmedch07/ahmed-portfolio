import projects from '../../projects.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';

function normalizeImageUrl(url: string) {
  if (!url) return ''
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/')
  }
  return url
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string;
  tech: string[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const imageUrl = project.image ? normalizeImageUrl(project.image) : ''

  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">
      <div className="max-w-5xl mx-auto">
        <Link href="/projects" className="text-cyan-400 hover:underline mb-8 inline-block">
          ← Back to Projects
        </Link>

        <div className="mt-8 rounded-3xl border border-gray-800 bg-gray-950 p-8 shadow-xl shadow-cyan-500/10">
          <h1 className="text-5xl font-bold text-cyan-400">{project.title}</h1>
          <p className="mt-4 text-gray-300 text-lg">{project.description}</p>

          {imageUrl ? (
            <div className="mt-8 overflow-hidden rounded-3xl border border-gray-800 bg-black">
              <img
                src={imageUrl}
                alt={project.title}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">Project Details</h2>
              <p className="mt-3 text-gray-300 leading-8">{project.details}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white">Tech Stack</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {project.tech.map((item) => (
                  <span key={item} className="rounded-full border border-cyan-500 px-4 py-2 text-sm text-cyan-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
