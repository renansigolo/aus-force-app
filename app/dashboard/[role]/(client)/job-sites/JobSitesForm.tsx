"use client"

import { JobSitesListDataProps } from "@/app/dashboard/[role]/(client)/job-sites/page"
import { Button } from "@/components/Button"
import { FormInputError } from "@/components/FormInputError"
import { createDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline"
import { serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type FormValues = {
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
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>()

  const hideModal = () => router.push("?showModal=false")

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      createdAt: serverTimestamp(),
      policyAndProceduresURL: "",
    }

    try {
      await createDocument("jobSites", payload)
      reset()
      router.refresh()
      toast.success("Job site submitted")
      hideModal()
    } catch (error) {
      showErrorMessage(error)
    }
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
              aria-describedby="parking-availability"
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
          <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            Upload a new policy
          </span>
        </button>
      </div>

      <div className="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button type="submit" className="btn-success" disabled={isSubmitting || !isValid}>
          Submit
        </Button>
        <Button
          type="button"
          className="btn-secondary"
          onClick={() => hideModal()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
