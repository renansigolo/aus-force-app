"use client"

import { Button } from "@/components/Button"
import { FormInputError } from "@/components/FormInputError"
import { auth, getUserDoc } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { LoginFormSchema, TLoginFormSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export function LoginForm() {
  const router = useRouter()

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
      const currentUser = await getUserDoc(user.uid)

      toast.success(`Welcome back, ${user.email}`)
      router.push(`/dashboard?role=${currentUser.role}`)
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          {...register("email", { required: "Email is required" })}
          id="email"
          type="email"
          autoComplete="email"
          disabled={isSubmitting}
        />
        <FormInputError message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          {...register("password", { required: "Password required" })}
          id="password"
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

      <Button disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting" : "Log in"}
      </Button>
    </form>
  )
}
