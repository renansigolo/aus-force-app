import { AuthWrapper } from "@/components/AuthWrapper"

export const dynamic = "force-dynamic"

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <AuthWrapper />
      <main className="min-h-almost-full flex flex-1 flex-col bg-gray-100 py-4">
        {children}
      </main>
    </>
  )
}
