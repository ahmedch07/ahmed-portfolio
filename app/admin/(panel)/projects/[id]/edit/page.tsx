import dbConnect from '@/lib/mongodb'
import Project from '@/lib/models/Project'
import { notFound } from 'next/navigation'
import ProjectForm from '../../_components/ProjectForm'

interface EditProjectPageProps {
  params: Promise<{ id: string }>
}

export const metadata = {
  title: 'Edit Project — Admin',
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params
  await dbConnect()
  const project = await Project.findById(id).lean()

  if (!project) notFound()

  const p = project as {
    _id: { toString: () => string }
    slug?: string
    title?: string
    description?: string
    details?: string
    image?: string
    tech?: string[]
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Edit Project</h1>
        <p className="mt-1 text-sm text-gray-400">Update project details</p>
      </div>
      <ProjectForm
        mode="edit"
        project={{
          id: p._id.toString(),
          title: p.title || '',
          description: p.description || '',
          details: p.details || '',
          image: p.image || '',
          tech: p.tech || [],
        }}
      />
    </div>
  )
}
