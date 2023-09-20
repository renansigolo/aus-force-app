"use client"

import { AccordionProps } from "@/app/dashboard/staff/page"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

type Inputs = {
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
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    shouldUseNativeValidation: true,
  })

  const hideModal = () => router.push("?showModal=false")

  const onSubmit = (data: Inputs) => {
    console.log(data)
    // Save data to firebase

    accordionData.push({
      ...accordionData,
      title: data.jobSite,
      staff: [
        {
          email: data.email,
          role: data.role,
        },
      ],
    })

    hideModal()
  }

  return (
    <form className="my-12 space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-6 grid grid-cols-1 gap-4">
        <div className="col-span-1">
          <label htmlFor="job-site" className="block text-sm font-medium text-gray-700">
            Job Site
          </label>
          <div className="mt-1">
            <select {...register("jobSite")}>
              <option>Site 1</option>
              <option>Site 2</option>
              <option>Site 3</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <div className="mt-1">
            <select {...register("role")}>
              <option>Supervisor</option>
              <option>Manager</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input className="form-input" {...register("email")} required />
            {errors.email && <span>This field is required</span>}
          </div>
        </div>
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
