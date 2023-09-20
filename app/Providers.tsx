"use client"

import NiceModal from "@ebay/nice-modal-react"
import { ReactNode } from "react"

type ProvidersProps = {
  children: ReactNode
}
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <NiceModal.Provider>{children}</NiceModal.Provider>
    </>
  )
}
