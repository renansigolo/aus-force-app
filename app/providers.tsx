"use client"

import { Toaster } from "react-hot-toast"

type ProvidersProps = {
  children: React.ReactNode
}
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <Toaster position="top-right" reverseOrder={true} />
    </>
  )
}
