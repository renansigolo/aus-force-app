"use client"

import { CurrentUserProfile } from "@/app/dashboard/profile/page"
import { Button } from "@/components/Button"
import { updateDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type PersonalDocumentsFormProps = {
  user: CurrentUserProfile
}

export function PersonalDocumentsForm({ user }: PersonalDocumentsFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CurrentUserProfile>({ defaultValues: user })

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
          <label htmlFor="passportNumber" className="form-label">
            ID / Passport
          </label>
          <input
            type="text"
            disabled={isSubmitting}
            {...register("passportNumber", { required: "Passport number is required" })}
          />

          <div className="flex gap-2">
            <div className="mt-2 w-full">
              <label htmlFor="passportIssued" className="form-label">
                Date of Issue
              </label>
              <input type="date" {...register("passportIssued")} />
            </div>

            <div className="mt-2 w-full">
              <label htmlFor="passportExpiry" className="form-label">
                Expiry Date
              </label>
              <input type="date" {...register("passportExpiry")} />
            </div>
          </div>
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

          <div className="flex gap-2">
            <div className="mt-2 w-full">
              <label htmlFor="driverLicenseIssued" className="form-label">
                Date of Issue
              </label>
              <input type="date" {...register("driverLicenseIssued")} />
            </div>

            <div className="mt-2 w-full">
              <label htmlFor="driverLicenseExpiry" className="form-label">
                Expiry Date
              </label>
              <input type="date" {...register("driverLicenseExpiry")} />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="identification" className="form-label">
            ID
          </label>
          <input
            type="number"
            disabled={isSubmitting}
            {...register("identificationNumber", {
              required: "ID is required",
              valueAsNumber: true,
            })}
          />

          <div className="flex gap-2">
            <div className="mt-2 w-full">
              <label htmlFor="identificationIssued" className="form-label">
                Date of Issue
              </label>
              <input type="date" {...register("identificationIssued")} />
            </div>

            <div className="mt-2 w-full">
              <label htmlFor="identificationExpiry" className="form-label">
                Expiry Date
              </label>
              <input type="date" {...register("identificationExpiry")} />
            </div>
          </div>
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </Button>
      </div>
    </form>
  )
}
