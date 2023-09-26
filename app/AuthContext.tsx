"use client"

import { Loader } from "@/components/Loader"
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
      // Update the user state with the new user if available
      user ? setUser(user) : setUser(null)
      // Set loading to false once authentication state is determined
      setLoading(false)
    })

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => unsubscribe()
  }, [])

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
    </AuthContext.Provider>
  )
}
