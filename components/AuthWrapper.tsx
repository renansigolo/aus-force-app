"use client"

import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"

type AuthWrapperProps = {
  children?: React.ReactNode
}
export function AuthWrapper({ children }: AuthWrapperProps) {
  const [user] = useAuthState(auth)
  const router = useRouter()

  if (!user) {
    router.push("/log-in")
  } else {
    router.push("/dashboard")
  }

  return null
}
