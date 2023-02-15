"use client"

import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"

export function AuthWrapper() {
  const [user] = useAuthState(auth)
  const router = useRouter()

  if (user) {
    router.push("/dashboard")
  } else {
    router.push("/log-in")
  }

  return <p>Authenticating, please wait...</p>
}
