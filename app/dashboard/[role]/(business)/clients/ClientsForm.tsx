"use client"

import { useUserContext } from "@/app/UserContext"
import { JobSitesData } from "@/app/dashboard/[role]/(client)/job-sites/page"
import { Button } from "@/components/Button"
import { FormInputError } from "@/components/FormInputError"
import { InviteUserEmailProps } from "@/emails/invite-user"
import { createDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type ClientFormInputs = {
  name: string
  email: string
  jobSites?: JobSitesData
}

export function ClientsForm() {
  const router = useRouter()
  const { user } = useUserContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ClientFormInputs>()

  const hideModal = () => router.push("?showModal=false")

  const onSubmit = async (values: ClientFormInputs) => {
    try {
      await createDocument("clients", values)

      const emailPayload: InviteUserEmailProps = {
        clientName: values.name,
        clientEmail: values.email,
        clientRole: "client",
        invitedByDisplayName: String(user?.displayName),
        invitedByEmail: String(user?.email),
      }

      const sendEmailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      })

      if (!sendEmailResponse.ok) throw new Error("Failed to send email")

      router.refresh()
      toast.success(
        `An email has been sent to ${values.email} with instructions on how to sign up.`,
      )
      reset()
    } catch (error) {
      showErrorMessage(error)
    }

    reset()
    hideModal()
  }

  return (
    <form className="my-8 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Client/Business Name</label>
        <input
          id="name"
          type="text"
          placeholder="Full Name"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name is too short" },
          })}
        />
        <FormInputError message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor="clientEmail">Email</label>
        <input
          id="clientEmail"
          type="email"
          placeholder="example@email.com"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
          })}
        />
        <FormInputError message={errors.email?.message} />
      </div>

      <div className="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button type="submit" className="btn-success" disabled={isSubmitting || !isValid}>
          Submit
        </Button>
        <Button href="?showModal=false" className="btn-secondary">
          Cancel
        </Button>
      </div>
    </form>
  )
}
