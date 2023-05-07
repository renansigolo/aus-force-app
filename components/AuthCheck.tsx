"use client"

import { UserContext } from "@/app/Providers"
import { redirect } from "next/navigation"
import { useContext } from "react"

/** Component's children only shown to logged-in users */
export function AuthCheck(props: any) {
  const user = useContext(UserContext)
  return user ? props.children : props.fallback || redirect("/log-in")
}
