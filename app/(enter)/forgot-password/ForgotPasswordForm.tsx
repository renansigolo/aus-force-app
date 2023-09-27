"use client"

import { auth } from "@/lib/firebase"
import { sendPasswordResetEmail } from "@firebase/auth"
import { FirebaseError } from "@firebase/util"
import { useRouter } from "next/navigation"
import { FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export function ForgotPasswordForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm()

  function onSubmit({ email }: FieldValues) {
    // Send the password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => router.push("?showModal=true"))
      .catch((error: FirebaseError) => toast.error(error.message))
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          autoComplete="email"
          disabled={isSubmitting}
          {...register("email", { required: "Please enter your email address" })}
        />
      </div>

      <div>
        <button
          disabled={isSubmitting || !isValid}
          className="btn btn-primary flex w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Reset Password"}
        </button>
      </div>
    </form>
  )
}
