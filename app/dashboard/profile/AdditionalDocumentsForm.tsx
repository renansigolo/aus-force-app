"use client"

import { useForm } from "react-hook-form"

export function AdditionalDocumentsForm(props: any) {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="passport" className="form-label">
              ID / Passport
            </label>
            <input
              type="number"
              {...register("passport", { required: "Passport number is required" })}
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="whiteCard" className="form-label">
              White Card
            </label>
            <input
              type="number"
              {...register("whiteCard", { required: "White card number is required" })}
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="signature" className="form-label">
              Signature
            </label>
            {props.signatureURL && (
              <div className="rounded-md border border-gray-200 bg-white p-6 hover:cursor-not-allowed">
                <img src={props.signatureURL} alt="Signature" width={500} height={300} />
              </div>
            )}
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
