"use client"

import { auth } from "@/lib/firebase"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

type AuthCheckProps = {
  children: ReactNode
  fallback?: ReactNode
}

/** Component's children only shown to logged-in users */
export function AuthCheck(props: AuthCheckProps) {
  console.log("🚀 ~ AuthCheck ~ auth:", auth)
  const { currentUser } = auth
  console.log("🚀 ~ AuthCheck ~ currentUser:", currentUser)
  return currentUser ? props.children : props.fallback || redirect("/log-in")
}
