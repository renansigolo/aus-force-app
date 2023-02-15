"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { FormEvent } from "react"
import toast from "react-hot-toast"

function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  // setLoading(true)

  // Read the form data
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const formJson = Object.fromEntries(formData.entries())

  // Show a success message notification
  toast.success(`Email sent to ${formJson.email}`)

  // fetch(`/forgotPassword`, {
  //   method: "post",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(formJson),
  // })
  //   .then((res) => {
  //     if (res.ok) {
  //       form.reset()
  //       // setSuccess(true)
  //     } else {
  //       throw new Error("Something went wrong")
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //   })
  //   .finally(() => {
  //     // setLoading(false)
  //   })
}

export default function ForgotPasswordPage() {
  return (
    <>
      <EnterHeader
        title="Forgot your password?"
        description="Enter your email address below and we will send you a link to reset"
      />

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <button className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Reset Password
          </button>
        </div>
      </form>
    </>
  )
}
