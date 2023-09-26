"use client"

import { auth } from "@/lib/firebase"
import { User, onAuthStateChanged } from "firebase/auth"
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
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

// Create the authentication context
export const AuthContext = createContext<UserContextType | null>(null)

// Custom hook to access the authentication context
// export const useAuthContext = () => useContext()
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider")
  }
  return context
}

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps): JSX.Element {
  // Set up state to track the authenticated user and loading status
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("🚀 ~ INNNN:", user)
        // User is signed in
        setUser(user)
      } else {
        console.log("OUTTTT:", user)
        // User is signed out
        setUser(null)
      }
      // Set loading to false once authentication state is determined
      setLoading(false)
    })

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => unsubscribe()
  }, [])

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}
