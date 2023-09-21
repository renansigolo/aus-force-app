"use client"

import { useUserContext } from "@/app/Providers"
import { FormInputError } from "@/components/FormInputError"
import { Loader } from "@/components/Loader"
import { auth } from "@/lib/firebase"
import { LoginFormSchema, TLoginFormSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export function LoginForm() {
  const router = useRouter()
  const { setUser } = useUserContext()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  })

  const onSubmit = async (data: TLoginFormSchema) => {
    // If we're in development, just redirect to the dashboard bypassing the authentication
    try {
      const { user } = await signInWithEmailAndPassword(auth, data.email, data.password)

      setUser(user)
      toast.success(`Welcome back, ${user.email}`)
      router.push("/dashboard")
    } catch (error) {
      const errorMessage = (error as FirebaseError)?.message || "An error occurred"
      toast.error(errorMessage)
    }
  }

  return (
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
          <Link
            href="/forgot-password"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </Link>
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
  )
}
