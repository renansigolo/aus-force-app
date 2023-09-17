"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { auth } from "@/lib/firebase"
import { FirebaseError } from "firebase/app"
import { sendPasswordResetEmail } from "firebase/auth"
import { FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  function onSubmit({ email }: FieldValues) {
    // Send the password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => toast.success(`Password reset email sent to ${email}!`))
      .catch((error: FirebaseError) => toast.error(error.message))
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
      <div className="min-h-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <EnterHeader
          title="Forgot your password?"
          description="Enter your email address below and we will send you a link to reset"
        />

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input {...register("email")} autoComplete="" type="email" disabled={isSubmitting} />
          </div>

          <div>
            <button disabled={isSubmitting} className="btn btn-primary flex w-full justify-center">
              {isSubmitting ? "Submitting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
