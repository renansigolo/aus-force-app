import { AuthCheck } from "@/components/AuthCheck"
import { Navbar } from "@/components/dashboard/Navbar"
import { ReactNode } from "react"

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthCheck>
      <Navbar />
      <main className="min-h-almost-full flex flex-1 flex-col bg-gray-100 py-4">{children}</main>
    </AuthCheck>
  )
}
