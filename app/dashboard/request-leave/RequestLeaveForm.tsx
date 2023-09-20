"use client"

import { ErrorMessage } from "@hookform/error-message"
import { useForm } from "react-hook-form"

type TRequestLeaveForm = {
  reason: string
  startDate: string
  endDate: string
  additionalNotes: string
}

export function RequestLeaveForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TRequestLeaveForm>({ shouldUseNativeValidation: true })

  const onSubmit = (data: TRequestLeaveForm) => {
    console.log(data)
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
          <select {...register("reason", { required: "Reason is required" })}>
            <option>Day Off</option>
            <option>Holidays</option>
            <option>Vacations</option>
          </select>
          <ErrorMessage errors={errors} name="reason" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label htmlFor="startDate" className="form-label">
              Start date
            </label>
            <input type="date" {...register("startDate", { required: true })} />
          </div>

          <div className="w-full sm:w-1/2">
            <label htmlFor="endDate" className="form-label">
              End date
            </label>
            <input type="date" {...register("endDate", { required: true })} />
          </div>
        </div>

        <div>
          <label htmlFor="additionalNotes" className="form-label">
            Additional notes
          </label>
          <textarea rows={4} {...register("additionalNotes")} />
        </div>
      </div>

      <div className="flex items-center gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:justify-end sm:px-8">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting || !isValid}>
          Submit
        </button>
      </div>
    </form>
  )
}
