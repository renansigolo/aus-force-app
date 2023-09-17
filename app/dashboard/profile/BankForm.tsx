"use client"

import { useForm } from "react-hook-form"

export function BankForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="bankName" className="block text-sm font-medium leading-6 text-gray-900">
              Bank name
            </label>
            <select
              id="bankName"
              name="bankName"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="ING"
            >
              <option>Adelaide Bank</option>
              <option>AMP Bank Ltd</option>
              <option>ANZ</option>
              <option>Bank of Melbourne</option>
              <option>Bank of Queensland</option>
              <option>Bank of South Australia</option>
              <option>Bendigo Bank</option>
              <option>Citibank</option>
              <option>Commonwealth Bank of Australia</option>
              <option>HSBC</option>
              <option>ING</option>
              <option>Macquarie Bank</option>
              <option>ME Bank</option>
              <option>NAB</option>
              <option>Revolut </option>
              <option>St. George Bank</option>
              <option>Suncorp Bank Bankwest</option>
              <option>UBank</option>
              <option>Westpac</option>
            </select>
          </div>

          <div className="col-span-full">
            <label htmlFor="accountName" className="form-label">
              Account name
            </label>
            <input
              type="text"
              {...register("accountName", { required: "Account name is required" })}
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="bsb" className="form-label">
              BSB
            </label>
            <input
              type="number"
              {...register("bsb", {
                required: "BNB number is required",
                minLength: 6,
                maxLength: 6,
              })}
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="accountNumber" className="form-label">
              Account number
            </label>
            <input
              type="number"
              {...register("accountNumber", {
                required: "Account number is required",
                minLength: 9,
                maxLength: 9,
              })}
            />
          </div>
        </div>

        <div className="mt-8 flex">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </>
  )
}
