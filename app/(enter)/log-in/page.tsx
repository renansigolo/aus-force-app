"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { auth } from "@/lib/firebase"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function LogInPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    // Read the form data
    const form = new FormData(e.currentTarget)
    const formData = Object.fromEntries(form.entries()) as any

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        router.push("/dashboard")
        toast.success(`Welcome back, ${userCredential.user.email}`)
      })
      .catch((error: FirebaseError) => toast.error(error.message))
      .finally(() => setSubmitting(false))
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
                    required
                    disabled={submitting}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
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
                    required
                    disabled={submitting}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
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
                <button
                  disabled={submitting}
                  className="btn btn-primary flex w-full justify-center"
                >
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
