import projects from '../../../projects.json'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import EditProjectForm from '../../../components/EditProjectForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params
  const project = projects.find((item) => item.id === id)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white px-8 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/projects" className="text-cyan-400 hover:underline mb-6 inline-block">
          ← Back to Projects
        </Link>
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">Edit Project</h1>
        <EditProjectForm project={project!} />
      </div>
    </main>
  )
}
