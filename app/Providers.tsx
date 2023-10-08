"use client"

import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

type ProvidersProps = {
  children: ReactNode
}
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <Toaster position="top-right" reverseOrder={true} />
    </>
  )
}
