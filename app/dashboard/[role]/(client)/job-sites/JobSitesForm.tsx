"use client"

import { Button } from "@/components/Button"
import { FormInputError } from "@/components/FormInputError"
import { createDocument, upload } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type FormValues = {
  siteName: string
  siteAddress: string
  hasParking: boolean
  additionalNotes: string
  policyAndProceduresFile?: FileList
  policyAndProceduresURL?: String | null
}

export function JobSiteForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>()

  const hideModal = () => router.push("?showModal=false")

  const onSubmit = async (values: FormValues) => {
    try {
      const policyAndProceduresURL = await upload(
        `jobSite/${values.siteName}/policyAndProcedures.pdf`,
        values.policyAndProceduresFile?.item(0),
      )

      const payload = {
        ...values,
        policyAndProceduresURL,
        createdAt: serverTimestamp(),
      }

      delete payload.policyAndProceduresFile

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
        <label htmlFor="siteName">Site Name</label>
        <input
          id="siteName"
          type="text"
          {...register("siteName", { required: "Site name is required" })}
        />
        <FormInputError message={errors.siteName?.message} />
      </div>

      <div>
        <label htmlFor="siteAddress">Address</label>
        <input
          id="siteAddress"
          type="text"
          {...register("siteAddress", { required: "Address is required" })}
        />
        <FormInputError message={errors.siteAddress?.message} />
      </div>

      <div>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center justify-center">
            <input
              id="hasParking"
              type="checkbox"
              {...register("hasParking")}
              aria-describedby="parking-availability"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="hasParking">Parking available for workers?</label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="additionalNotes">Additional Notes</label>
        <textarea id="additionalNotes" {...register("additionalNotes")} />
      </div>

      <div>
        <label htmlFor="policyAndProceduresFile">Policies and Procedures</label>
        <input
          id="policyAndProceduresFile"
          type="file"
          accept=".pdf"
          className="form-input"
          {...register("policyAndProceduresFile")}
        />
        <FormInputError message={errors.siteAddress?.message} />
      </div>

      <div className="mt-5 flex gap-2 sm:mt-4 sm:flex-row-reverse">
        <Button
          type="submit"
          className="btn-success w-full sm:w-auto"
          disabled={isSubmitting || !isValid}
        >
          Submit
        </Button>
        <Button
          type="button"
          className="btn-secondary w-full sm:w-auto"
          onClick={() => hideModal()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
