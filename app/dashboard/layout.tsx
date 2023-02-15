type DashboardLayoutProps = {
  children: React.ReactNode
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="min-h-almost-full flex flex-1 flex-col bg-gray-100 py-4">
      {children}
    </main>
  )
}
