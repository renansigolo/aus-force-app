"use client"

import { DatabaseUser } from "@/app/dashboard/profile/page"
import { Loader } from "@/components/Loader"
import { auth, getUserDoc } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { usePathname, useRouter } from "next/navigation"
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type UserContextType = {
  user: DatabaseUser | null
  setUser: Dispatch<SetStateAction<DatabaseUser | null>>
}

// Create the authentication context
export const UserContext = createContext<UserContextType | null>(null)

// Custom hook to access the authentication context
export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider")
  }
  return context
}

interface UserContextProviderProps {
  children: ReactNode
}

export function UserContextProvider({ children }: UserContextProviderProps): JSX.Element {
  const pathname = usePathname()
  const router = useRouter()

  // Set up state to track the authenticated user and loading status
  const [user, setUser] = useState<DatabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Redirect to dashboard if user is logged in
  useEffect(() => {
    if (user) {
      if (
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname === "/forgot-password"
      ) {
        router.push("/dashboard")
      }
    }
  }, [user])

  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const dbUser = user && (await getUserDoc(user.uid))

      // Update the user state with the new user if available
      user ? setUser(dbUser) : setUser(null)
      // Set loading to false once authentication state is determined
      setLoading(false)
    })

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => unsubscribe()
  }, [])

  // Provide the authentication context to child components
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? (
        <div className="grid min-h-screen place-content-center">
          <div className="flex flex-col items-center gap-2">
            <Loader show />
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  )
}
