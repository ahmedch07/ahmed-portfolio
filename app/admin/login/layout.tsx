// Login page uses its own minimal layout (NOT the protected admin layout)
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
