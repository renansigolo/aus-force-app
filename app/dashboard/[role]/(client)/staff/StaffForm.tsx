"use client"

import { AccordionProps } from "@/app/dashboard/[role]/(client)/staff/page"
import { FormInputError } from "@/components/FormInputError"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

type FormInputs = {
  email: string
  role: "Supervisor" | "Manager"
  jobSite: string
}

type StaffModalProps = {
  accordionData: AccordionProps[]
}

export function StaffForm({ accordionData }: StaffModalProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInputs>()

  const hideModal = () => router.push("?showModal=false")

  const onSubmit = async (values: FormInputs) => {
    // Find the item in the accordionData array that matches the jobSite
    const accordionItem = accordionData.find((item) => item.title === values.jobSite)

    accordionItem
      ? // If the item exists, push the new staff member to the staff array
        accordionItem.staff.push({
          email: values.email.trim(),
          role: values.role,
        })
      : // Otherwise, create a new item with the staff array
        accordionData.push({
          ...accordionData,
          title: values.jobSite,
          staff: [
            {
              email: values.email.trim(),
              role: values.role,
            },
          ],
        })

    reset()
    hideModal()
  }

  return (
    <form className="my-8 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="jobSite">Job Site</label>
        <select id="jobSite" {...register("jobSite")}>
          <option>Site 1</option>
          <option>Site 2</option>
          <option>Site 3</option>
        </select>
        <FormInputError message={errors.jobSite?.message} />
      </div>

      <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register("role")}>
          <option>Supervisor</option>
          <option>Manager</option>
        </select>
        <FormInputError message={errors.role?.message} />
      </div>

      <div>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="email@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
          })}
        />
        <FormInputError message={errors.email?.message} />
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          disabled={isSubmitting || !isValid}
        >
          Submit
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => hideModal()}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
