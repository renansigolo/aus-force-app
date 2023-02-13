"use client"

import { NavbarTop } from "@/components/dashboard/NavbarTop"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { useState } from "react"

type DashboardLayoutProps = {
  children: React.ReactNode
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex flex-1 flex-col md:pl-64">
        <NavbarTop setSidebarOpen={setSidebarOpen} />

        {children}
      </main>
    </>
  )
}
