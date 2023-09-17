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
  return auth.currentUser ? props.children : props.fallback || redirect("/log-in")
}
