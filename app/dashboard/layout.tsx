import { Navbar } from "@/app/dashboard/Navbar"
import { AuthCheck } from "@/components/AuthCheck"
import { ReactNode } from "react"

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthCheck>
      <Navbar />
      <main className="flex min-h-[calc(100vh-68px)] flex-1 flex-col bg-gray-100 py-4">
        {children}
      </main>
    </AuthCheck>
  )
}
