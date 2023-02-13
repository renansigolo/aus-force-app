"use client"

import { NavbarTop } from "@/components/dashboard/NavbarTop"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { ReactNode, useState } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
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
