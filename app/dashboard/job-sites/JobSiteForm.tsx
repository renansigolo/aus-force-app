"use client"

import { JobSitesListDataProps } from "@/app/dashboard/job-sites/page"
import { FormInputError } from "@/components/FormInputError"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

type FormInputs = {
  siteName: string
  siteAddress: string
  hasParking: boolean
  additionalNotes: string
  policyAndProceduresURL: string
}

type JobSiteFormProps = {
  data: JobSitesListDataProps[]
}

export function JobSiteForm({ data }: JobSiteFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInputs>({ shouldUseNativeValidation: true })

  const hideModal = () => router.push("?showModal=false")

  const onSubmit = (values: FormInputs) => {
    // TODO: Save data to firebase
    console.log(data)
    data.push({
      ...values,
      policyAndProceduresURL: "",
    })

    hideModal()
  }

  return (
    <form className="my-8 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="siteName" className="form-label">
          Site Name
        </label>
        <input {...register("siteName", { required: "Site name is required" })} type="text" />
        <FormInputError message={errors.siteName?.message} />
      </div>

      <div>
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input {...register("siteAddress", { required: "Address is required" })} type="text" />
        <FormInputError message={errors.siteAddress?.message} />
      </div>

      <div>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center justify-center">
            <input
              {...register("hasParking")}
              aria-describedby="parking-description"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="parking" className="form-label">
              Parking available for workers?
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="additionalNotes" className="form-label">
          Additional Notes
        </label>
        <textarea {...register("additionalNotes")} />
      </div>

      <div>
        <label className="form-label">Policies and Procedures</label>
        <input type="file" className="hidden" {...register("policyAndProceduresURL")} />
        <button
          type="button"
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
            />
          </svg>
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            Upload a new policy
          </span>
        </button>
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
