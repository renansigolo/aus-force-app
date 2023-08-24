"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import Loading from "@/app/loading"
import { FormInputError } from "@/components/FormInputError"
import { auth } from "@/lib/firebase"
import { LoginFormSchema, LoginFormSchemaType } from "@/lib/schemas"
import { signInWithEmailAndPassword } from "@firebase/auth"
import { FirebaseError } from "@firebase/util"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export default function LogInPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
  })

  const login: SubmitHandler<LoginFormSchemaType> = (data) => {
    setSubmitting(true)

    // If we're in development, just redirect to the dashboard bypassing the authentication
    if (process.env.NODE_ENV === "development") {
      router.push("/dashboard")
    } else {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          toast.success(`Welcome back, ${userCredential.user.email}`)
          router.push("/dashboard")
        })
        .catch((error: FirebaseError) => toast.error(error.message))
        .finally(() => setSubmitting(false))
    }
  }

  return (
    <>
      {submitting ? (
        <Loading />
      ) : (
        <div className="min-h-full sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="min-h-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <div className="flex h-full flex-col justify-center">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <EnterHeader title="Log in to your account" description="Or " page="log-in" />

                <form className="space-y-6" onSubmit={handleSubmit(login)}>
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      {...register("email", { required: true })}
                      className="form-input"
                      type="Email"
                    />
                    <FormInputError message={errors.email?.message} />
                  </div>

                  <div>
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      {...register("password", { required: true })}
                      className="form-input"
                      type="password"
                    />
                    <FormInputError message={errors.password?.message} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <a
                        href="/forgot-password"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <button
                    disabled={submitting}
                    className="btn btn-primary flex w-full justify-center"
                  >
                    Log in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
