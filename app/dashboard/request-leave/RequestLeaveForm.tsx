"use client"

import { ErrorMessage } from "@hookform/error-message"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type TRequestLeaveForm = {
  reason: string
  startDate: string
  endDate: string
  additionalNotes: string
}

export function RequestLeaveForm() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TRequestLeaveForm>({
    mode: "onChange",
  })
  console.log("🚀 ~ RequestLeaveForm ~ isSubmitting:", isSubmitting)

  const onSubmit = async (data: TRequestLeaveForm) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
    toast.success("Leave request submitted")
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
            <option>Day Off</option>
            <option>Holidays</option>
            <option>Vacations</option>
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
                // date cannot be in the past or higher than end date
                validate: (value) =>
                  (value >= new Date().toISOString().split("T")[0] &&
                    value <= new Date(getValues("endDate")).toISOString().split("T")[0]) ||
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
                // date cannot be in the past or higher than end date
                validate: (value) =>
                  (value >= new Date().toISOString().split("T")[0] &&
                    value >= new Date(getValues("startDate")).toISOString().split("T")[0]) ||
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
        <button type="submit" className="btn btn-primary" disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  )
}
