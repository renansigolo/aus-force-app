"use client"

import { RequestLeaveData as LeaveRequestsData } from "@/app/dashboard/leave-requests/page"
import { createDocument } from "@/lib/firebase"
import { getISODate, showErrorMessage } from "@/lib/helpers"
import { ErrorMessage } from "@hookform/error-message"
import { serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export function LeaveRequestsForm() {
  const router = useRouter()
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeaveRequestsData>()

  const onSubmit = async (values: LeaveRequestsData) => {
    const payload = {
      ...values,
      createdAt: serverTimestamp(),
      status: "pending",
      policyAndProceduresURL: "",
    }

    try {
      await createDocument("leaveRequests", payload)
      router.refresh()
      toast.success("Leave request submitted")
      reset()
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <form
      className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 px-4 py-6 sm:p-7">
        <div>
          <label htmlFor="reason" className="form-label">
            Reason
          </label>
          <select
            {...register("reason", { required: "Reason is required" })}
            disabled={isSubmitting}
          >
            <option>Day(s) off (unpaid)</option>
            <option>Annual leave (unpaid)</option>
            <option>Medical leave (unpaid)</option>
            <option>Parental leave (unpaid)</option>
            <option>Sick Leave </option>
            <option>Long service leave </option>
            <option>Annual leave </option>
            <option>Community service leave </option>
            <option>Other leave</option>
          </select>
          <p className="form-error">
            <ErrorMessage errors={errors} name="reason" />
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label htmlFor="startDate" className="form-label">
              Start date
            </label>
            <input
              type="date"
              disabled={isSubmitting}
              {...register("startDate", {
                required: true,
                validate: (value) =>
                  // date cannot be in the past or higher than end date
                  (getISODate(value) >= getISODate() &&
                    getISODate(value) <= getISODate(getValues("endDate"))) ||
                  "Start date cannot be in the past or higher than end date",
              })}
            />
            <p className="form-error">
              <ErrorMessage errors={errors} name="startDate" />
            </p>
          </div>

          <div className="w-full sm:w-1/2">
            <label htmlFor="endDate" className="form-label">
              End date
            </label>
            <input
              type="date"
              disabled={isSubmitting}
              {...register("endDate", {
                required: true,
                validate: (value) =>
                  // date cannot be in the past or lower than start date
                  (getISODate(value) >= getISODate() &&
                    getISODate(value) >= getISODate(getValues("startDate"))) ||
                  "End date cannot be in the past or lower than start date",
              })}
            />
            <p className="form-error">
              <ErrorMessage errors={errors} name="endDate" />
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="additionalNotes" className="form-label">
            Additional notes
          </label>
          <textarea rows={4} disabled={isSubmitting} {...register("additionalNotes")} />
          <p className="form-error">
            <ErrorMessage errors={errors} name="additionalNotes" />
          </p>
        </div>
      </div>

      <div className="flex items-center gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:justify-end sm:px-8">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  )
}