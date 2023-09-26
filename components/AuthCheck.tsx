"use client"

import { useAuthContext } from "@/app/AuthContext"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

type AuthCheckProps = {
  children: ReactNode
  fallback?: ReactNode
}

/** Component's children only shown to logged-in users */
export function AuthCheck(props: AuthCheckProps) {
  const { user } = useAuthContext()
  return user ? props.children : props.fallback || redirect("/login")
}
