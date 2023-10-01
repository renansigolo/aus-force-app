"use client"

import { JobSitesData } from "@/app/dashboard/[role]/(client)/job-sites/page"
import { FormInputError } from "@/components/FormInputError"
import { updateDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { arrayUnion } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

type StaffFormInputs = {
  email: string
  role: "Supervisor" | "Manager"
  jobSite: string
}

type StaffModalProps = {
  jobSitesData: JobSitesData[]
}

export function StaffForm({ jobSitesData }: StaffModalProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<StaffFormInputs>()

  const hideModal = () => router.push("?showModal=false")

  const onSubmit = async (values: StaffFormInputs) => {
    try {
      updateDocument("jobSites", values.jobSite, {
        staff: arrayUnion({
          email: values.email.trim(),
          role: values.role,
        }),
      })
    } catch (error) {
      showErrorMessage(error)
    }

    reset()
    hideModal()
  }

  return (
    <form className="my-8 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="jobSite">Job Site</label>
        <select id="jobSite" {...register("jobSite")}>
          {jobSitesData.map((jobSite) => (
            <option key={jobSite.id} value={jobSite.id}>
              {jobSite.siteName}
            </option>
          ))}
        </select>
        <FormInputError message={errors.jobSite?.message} />
      </div>

      <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register("role")}>
          <option value="supervisor">Supervisor</option>
          <option value="manager">Manager</option>
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
