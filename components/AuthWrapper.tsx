"use client"

import LoginPage from "@/app/(enter)/log-in/page"
import DashboardPage from "@/app/dashboard/page"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"

export function AuthWrapper() {
  const [user] = useAuthState(auth)
  const router = useRouter()

  return <>{user ? <DashboardPage /> : <LoginPage />}</>
}
