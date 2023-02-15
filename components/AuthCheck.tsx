"use client"

import { UserContext } from "@/app/Providers"
import Link from "next/link"
import { useContext } from "react"

// Component's children only shown to logged-in users
export function AuthCheck(props: any) {
  const user = useContext(UserContext)

  return user ? props.children : props.fallback || <Fallback />
}

function Fallback() {
  return (
    <div className="grid h-full place-content-center">
      <p>Looks like your session has expired</p>
      <Link href="/log-in" className="btn btn-primary">
        Click here to log in again
      </Link>
    </div>
  )
}
