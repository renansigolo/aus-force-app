"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { FormInputError } from "@/components/FormInputError"
import { auth } from "@/lib/firebase"
import { zodResolver } from "@hookform/resolvers/zod"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, UseFormRegister } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty().min(6),
})
type FormSchemaType = z.infer<typeof FormSchema>

export default function LogInPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (formData: FormSchemaType) => {
    setSubmitting(true)

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

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <FormInput
                  register={register}
                  id="email"
                  name="Email address"
                />
                <FormInputError message={errors.email?.message} />
              </div>

              <div>
                <FormInput register={register} id="password" name="Password" />
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

type FormInputProps = {
  register: UseFormRegister<FormSchemaType>
  id: keyof FormSchemaType
  name: string
}
function FormInput({ register, id, name }: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {name}
      </label>
      <input className="form-input" {...register(id)} />
    </div>
  )
}
