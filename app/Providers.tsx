"use client"

import { auth } from "@/lib/firebase"
import NiceModal from "@ebay/nice-modal-react"
import { createContext } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Toaster } from "react-hot-toast"

export const UserContext = createContext({ user: null })

type ProvidersProps = {
  children: React.ReactNode
}
export function Providers({ children }: ProvidersProps) {
  const [user] = useAuthState(auth)

  return (
    <>
      <UserContext.Provider value={user as any}>
        <NiceModal.Provider>{children}</NiceModal.Provider>
        <Toaster position="top-right" reverseOrder={true} />
      </UserContext.Provider>
    </>
  )
}
