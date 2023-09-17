"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { auth } from "@/lib/firebase"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/24/outline"
import { FirebaseError } from "firebase/app"
import { sendPasswordResetEmail } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Fragment, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export default function ForgotPasswordPage() {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    shouldUseNativeValidation: true,
  })

  function onSubmit({ email }: FieldValues) {
    // Send the password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => setOpen(true))
      .catch((error: FirebaseError) => toast.error(error.message))
  }

  return (
    <>
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
        </div>
      </div>
      <ModalSuccess open={open} setOpen={setOpen} />
    </>
  )
}

type ModalSuccessProps = {
  open: boolean
  setOpen: (open: boolean) => void
}
function ModalSuccess({ open, setOpen }: ModalSuccessProps) {
  const router = useRouter()
  const redirectToLogin = () => {
    setOpen(false)
    router.push("/log-in")
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Email sent successfully
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        We sent you an email with a link to reset your password. If you do not see
                        the email, please check your spam folder.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={redirectToLogin}
                  >
                    Go back to login
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
