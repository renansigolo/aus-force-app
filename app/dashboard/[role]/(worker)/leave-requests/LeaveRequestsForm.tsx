"use client"

import { RequestLeaveData as LeaveRequestsData } from "@/app/dashboard/[role]/(worker)/leave-requests/page"
import { Button } from "@/components/Button"
import { Card, CardContent, CardFooter } from "@/components/Card"
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="flex-col">
          <div>
            <label htmlFor="reason">Reason</label>
            <select
              id="reason"
              disabled={isSubmitting}
              {...register("reason", { required: "Reason is required" })}
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

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label htmlFor="startDate">Start date</label>
              <input
                id="startDate"
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
              <label htmlFor="endDate">End date</label>
              <input
                id="endDate"
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
            <label htmlFor="additionalNotes">Additional notes</label>
            <textarea
              id="additionalNotes"
              rows={4}
              disabled={isSubmitting}
              {...register("additionalNotes")}
            />
            <p className="form-error">
              <ErrorMessage errors={errors} name="additionalNotes" />
            </p>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
