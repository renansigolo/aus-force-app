"use client"

import { FormSectionHeading } from "@/app/(enter)/sign-up/FormSectionHeading"
import { Role } from "@/components/Roles"
import { useForm } from "react-hook-form"

const businessForm = [
  {
    required: "Legal Name is required",
    name: "legalName",
    id: "legalName",
    label: "Legal Name",
    type: "text",
    autoComplete: "company",
  },
  {
    required: "Trading Name is required",
    name: "tradingName",
    id: "tradingName",
    label: "Trading Name",
    type: "text",
    autoComplete: "organization",
  },
  {
    required: "ABN is required",
    name: "abn",
    id: "abn",
    label: "ABN number",
    type: "number",
    autoComplete: "",
  },
  {
    required: "",
    name: "acn",
    id: "acn",
    label: "ACN number",
    type: "number",
    autoComplete: "",
  },
]

export function ClientForm() {
  const { register } = useForm()

  return (
    <>
      {/* Business Information */}
      <Role role="client">
        <FormSectionHeading
          title="Business Information"
          description="Enter the details of your business."
        />

        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
          {businessForm.map((field, index) => (
            <div key={index} className="sm:col-span-3">
              <label htmlFor={field.id} className="form-label">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              <input
                type={field.type}
                autoComplete={field.autoComplete}
                {...register(field.id as any, { required: field.required })}
              />
              {/* <FormInputError message={errors[field.id] || ""} /> */}
            </div>
          ))}

          <div className="sm:col-span-6">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select {...register("country")} autoComplete="country-name">
              <option>Australia</option>
            </select>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="street-address" className="form-label">
              Street address
            </label>
            <input {...register("streetAddress")} type="text" autoComplete="street-address" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input {...register("city")} type="text" autoComplete="address-level2" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="region" className="form-label">
              State / Province
            </label>
            <input {...register("region")} type="text" autoComplete="address-level1" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="postal-code" className="form-label">
              ZIP / Postal code
            </label>
            <input {...register("postalCode")} type="text" autoComplete="postal-code" />
          </div>
        </div>
      </Role>
    </>
  )
}
