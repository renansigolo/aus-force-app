"use client"

import NiceModal from "@ebay/nice-modal-react"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

type ProvidersProps = {
  children: ReactNode
}
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <NiceModal.Provider>{children}</NiceModal.Provider>
      <Toaster position="top-right" reverseOrder={true} />
    </>
  )
}
