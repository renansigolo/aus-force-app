"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { auth } from "@/lib/firebase"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEventHandler } from "react"
import toast from "react-hot-toast"

export default function LogInPage() {
  const router = useRouter()

  const handleLogIn = (e: FormEventHandler<HTMLFormElement> | any) => {
    e.preventDefault()

    // Read the form data
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries()) as any

    signInWithEmailAndPassword(auth, formJson.email, formJson.password)
      .then((userCredential) => {
        router.push("/dashboard")
        toast.success(`Welcome back, ${userCredential.user.email}`)
      })
      .catch((error: FirebaseError) => toast.error(error.message))
  }

  return (
    <div className="min-h-full sm:mx-auto sm:w-full sm:max-w-2xl">
      <div className="min-h-full bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="flex h-full flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <EnterHeader
              title="Log in to your account"
              description="Or "
              page="log-in"
            />

            <form className="space-y-6" onSubmit={handleLogIn}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button className="btn btn-primary flex w-full justify-center text-center">
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
