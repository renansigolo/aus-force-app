"use client"

import NiceModal from "@ebay/nice-modal-react"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

// type UserContextType = {
//   user: User | null
//   setUser: React.Dispatch<React.SetStateAction<User | null>>
// }

// export const UserContext = createContext<UserContextType | null>(null)

type ProvidersProps = {
  children: ReactNode
}
export function Providers({ children }: ProvidersProps) {
  // const [user, setUser] = useState(auth.currentUser)

  return (
    <>
      {/* <UserContext.Provider value={{ user, setUser }}> */}
      <NiceModal.Provider>{children}</NiceModal.Provider>
      <Toaster position="top-right" reverseOrder={true} />
      {/* </UserContext.Provider> */}
    </>
  )
}

// export function useUserContext() {
//   const context = useContext(UserContext)
//   if (!context) {
//     throw new Error("useUserContext must be used within a UserProvider")
//   }
//   return context
// }
