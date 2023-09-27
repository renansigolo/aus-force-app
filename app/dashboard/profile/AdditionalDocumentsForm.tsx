"use client"

import { CurrentUserProfile } from "@/app/dashboard/profile/page"
import { updateDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type AdditionalDocumentsFormProps = {
  user: CurrentUserProfile
}

export function AdditionalDocumentsForm({ user }: AdditionalDocumentsFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CurrentUserProfile>({
    defaultValues: {
      passport: user.passport,
      driverLicense: user.driverLicense,
      whiteCard: user.whiteCard,
    },
  })

  const onSubmit = async (values: CurrentUserProfile) => {
    try {
      await updateDocument("users", user.uid, values)
      router.refresh()
      toast.success("Additional documents submitted successfully")
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div className="col-span-full">
          <label htmlFor="passport" className="form-label">
            ID / Passport
          </label>
          <input
            type="text"
            disabled={isSubmitting}
            {...register("passport", { required: "Passport number is required" })}
          />
        </div>

        <div className="col-span-full">
          <label htmlFor="driverLicense" className="form-label">
            Driver License
          </label>
          <input
            type="number"
            disabled={isSubmitting}
            {...register("driverLicense", {
              required: "Driver license is required",
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="col-span-full">
          <label htmlFor="whiteCard" className="form-label">
            White Card
          </label>
          <input
            type="number"
            disabled={isSubmitting}
            {...register("whiteCard", { required: "White card is required", valueAsNumber: true })}
          />
        </div>

        <div className="col-span-full">
          <label htmlFor="signature" className="form-label">
            Signature
          </label>
          {user.signatureURL && (
            <div className="rounded-md border border-gray-200 bg-white p-6 hover:cursor-not-allowed">
              <img src={user.signatureURL} alt="Signature" width={500} height={300} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex">
        <button type="submit" className="btn btn-primary">
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </form>
  )
}
