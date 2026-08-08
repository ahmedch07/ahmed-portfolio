import AdminSidebar from './_components/AdminSidebar'

export const metadata = {
  title: 'Admin Panel — Ahmed CH Portfolio',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8 lg:p-10">{children}</main>
    </div>
  )
}
