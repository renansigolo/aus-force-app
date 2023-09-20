"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { FormInputError } from "@/components/FormInputError"
import { Loader } from "@/components/Loader"
import { auth } from "@/lib/firebase"
import { LoginFormSchema, TLoginFormSchema } from "@/lib/schemas"
import { signInWithEmailAndPassword } from "@firebase/auth"
import { FirebaseError } from "@firebase/util"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export default function LogInPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  })

  const onSubmit = (data: TLoginFormSchema) => {
    // If we're in development, just redirect to the dashboard bypassing the authentication
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log("🚀 ~ .then ~ userCredential:", userCredential)
        toast.success(`Welcome back, ${userCredential.user.email}`)
        router.push("/dashboard")
      })
      .catch((error: FirebaseError) => toast.error(error.message))
  }

  return (
    <div className="min-h-full sm:mx-auto sm:w-full sm:max-w-2xl">
      <div className="min-h-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div className="flex h-full flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <EnterHeader title="Log in to your account" description="Or " page="log-in" />

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  autoComplete="email"
                  disabled={isSubmitting}
                />
                <FormInputError message={errors.email?.message} />
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  {...register("password", { required: "Password required" })}
                  type="password"
                  autoComplete="current-password"
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
                className="btn btn-primary flex w-full justify-center disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader show />
                    <span>Submitting</span>
                  </>
                ) : (
                  "Log in"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
