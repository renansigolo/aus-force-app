"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { FormInputError } from "@/components/FormInputError"
import { FormInputWrapper } from "@/components/FormInputWrapper"
import { LoginFormSchema, LoginFormSchemaType } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

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

  const login = (formData: LoginFormSchemaType) => {
    setSubmitting(true)

    return router.push("/dashboard")

    // signInWithEmailAndPassword(auth, formData.email, formData.password)
    //   .then((userCredential) => {
    //     router.push("/dashboard")
    //     toast.success(`Welcome back, ${userCredential.user.email}`)
    //   })
    //   .catch((error: FirebaseError) => toast.error(error.message))
    //   .finally(() => setSubmitting(false))
  }

  return (
    <div className="min-h-full sm:mx-auto sm:w-full sm:max-w-2xl">
      <div className="min-h-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div className="flex h-full flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <EnterHeader
              title="Log in to your account"
              description="Or "
              page="log-in"
            />

            <form className="space-y-6" onSubmit={handleSubmit(login)}>
              <div>
                <FormInputWrapper
                  register={register}
                  id="email"
                  name="Email address"
                  type="email"
                />
                <FormInputError message={errors.email?.message} />
              </div>

              <div>
                <FormInputWrapper
                  register={register}
                  id="password"
                  name="Password"
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
  )
}
