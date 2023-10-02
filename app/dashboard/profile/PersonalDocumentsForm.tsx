"use client"

import { DatabaseUser } from "@/app/dashboard/profile/page"
import { Button } from "@/components/Button"
import { updateDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type PersonalDocumentsFormProps = {
  user: DatabaseUser
}

export function PersonalDocumentsForm({ user }: PersonalDocumentsFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<DatabaseUser>({ defaultValues: user })

  const onSubmit = async (values: DatabaseUser) => {
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
          <label htmlFor="passportNumber">ID / Passport</label>
          <input
            id="passportNumber"
            type="text"
            disabled={isSubmitting}
            {...register("passportNumber", { required: "Passport number is required" })}
          />

          <div className="flex gap-2">
            <div className="mt-2 w-full">
              <label htmlFor="passportIssued">Date of Issue</label>
              <input id="passportIssued" type="date" {...register("passportIssued")} />
            </div>

            <div className="mt-2 w-full">
              <label htmlFor="passportExpiry">Expiry Date</label>
              <input id="passportExpiry" type="date" {...register("passportExpiry")} />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="driverLicense">Driver License</label>
          <input
            id="driverLicense"
            type="number"
            disabled={isSubmitting}
            {...register("driverLicenseNumber", {
              required: "Driver license is required",
              valueAsNumber: true,
            })}
          />

          <div className="flex gap-2">
            <div className="mt-2 w-full">
              <label htmlFor="driverLicenseIssued">Date of Issue</label>
              <input id="driverLicenseIssued" type="date" {...register("driverLicenseIssued")} />
            </div>

            <div className="mt-2 w-full">
              <label htmlFor="driverLicenseExpiry">Expiry Date</label>
              <input id="driverLicenseExpiry" type="date" {...register("driverLicenseExpiry")} />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="identificationNumber">ID</label>
          <input
            id="identificationNumber"
            type="number"
            disabled={isSubmitting}
            {...register("identificationNumber", {
              required: "ID is required",
              valueAsNumber: true,
            })}
          />

          <div className="flex gap-2">
            <div className="mt-2 w-full">
              <label htmlFor="identificationIssued">Date of Issue</label>
              <input id="identificationIssued" type="date" {...register("identificationIssued")} />
            </div>

            <div className="mt-2 w-full">
              <label htmlFor="identificationExpiry">Expiry Date</label>
              <input id="identificationExpiry" type="date" {...register("identificationExpiry")} />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <span>Signature</span>
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
