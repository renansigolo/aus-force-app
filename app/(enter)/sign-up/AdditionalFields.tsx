import { DocumentArrowUpIcon } from "@heroicons/react/20/solid"
import { UseFormReturn } from "react-hook-form"

type AdditionalFieldsProps = {
  register: UseFormReturn<any>["register"]
  inputValues: {
    numberId: string
    dateOfIssueId: string
    expiryDateId: string
  }
}
export function AdditionalFields({ register, inputValues }: AdditionalFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor={inputValues.numberId}>Number</label>
        <input type="text" {...register(inputValues.numberId)} />
        {/* <FormInputError message={errors.inputValues.numberId?.message} /> */}
      </div>

      <div className="flex gap-2">
        <div className="mt-2 w-full">
          <label htmlFor={inputValues.dateOfIssueId}>Date of Issue</label>
          <input type="date" {...register(inputValues.dateOfIssueId)} />
          {/* <FormInputError message={errors.inputValues.dateOfIssueId?.message} /> */}
        </div>

        <div className="mt-2 w-full">
          <label htmlFor={inputValues.expiryDateId}>Expiry Date</label>
          <input type="date" {...register(inputValues.expiryDateId)} />
          {/* <FormInputError message={errors.inputValues.expiryDateId?.message} /> */}
        </div>
      </div>

      <button
        type="button"
        className="relative mt-2 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <div className="flex flex-col content-center items-center justify-center">
          <DocumentArrowUpIcon className="h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">Upload Image</span>
        </div>
      </button>
    </>
  )
}
