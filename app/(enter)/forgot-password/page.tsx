"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { auth } from "@/lib/firebase"
import { FirebaseError } from "firebase/app"
import { sendPasswordResetEmail } from "firebase/auth"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"

export default function ForgotPasswordPage() {
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    // Read the form data
    const form = e.currentTarget
    const formInput = form.elements.namedItem("email") as HTMLInputElement
    const email = formInput.value

    // Send the password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => toast.success(`Password reset email sent to ${email}!`))
      .catch((error: FirebaseError) => toast.error(error.message))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
      <div className="min-h-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <EnterHeader
          title="Forgot your password?"
          description="Enter your email address below and we will send you a link to reset"
        />

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <button disabled={submitting} className="btn btn-primary flex w-full justify-center">
              {submitting ? "Submitting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
