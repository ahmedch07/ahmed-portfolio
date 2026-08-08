import ProjectForm from '../_components/ProjectForm'

export const metadata = {
  title: 'Add Project — Admin',
}

export default function AddProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Add Project</h1>
        <p className="mt-1 text-sm text-gray-400">Add a new project to your portfolio</p>
      </div>
      <ProjectForm mode="create" />
    </div>
  )
}
