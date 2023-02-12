"use client"

import { MainContent } from "@/components/dashboard/MainContent"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { useState } from "react"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false)

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <MainContent
        setSidebarOpen={setSidebarOpen}
        automaticTimezoneEnabled={automaticTimezoneEnabled}
        setAutomaticTimezoneEnabled={setAutomaticTimezoneEnabled}
        autoUpdateApplicantDataEnabled={autoUpdateApplicantDataEnabled}
        setAutoUpdateApplicantDataEnabled={setAutoUpdateApplicantDataEnabled}
      />
    </div>
  )
}
