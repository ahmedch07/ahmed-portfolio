import AdminLoginForm from './_components/AdminLoginForm'

export const metadata = {
  title: 'Admin Login — Ahmed CH',
}

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 overflow-hidden">
      {/* Glows */}
      <div className="pointer-events-none absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <AdminLoginForm />
    </div>
  )
}
