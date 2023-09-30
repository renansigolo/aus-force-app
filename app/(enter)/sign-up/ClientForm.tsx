"use client"

import { FormSectionHeading } from "@/app/(enter)/sign-up/FormSectionHeading"
import { Role } from "@/components/Roles"
import { useForm } from "react-hook-form"

const clientForm = [
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
          {clientForm.map((field, index) => (
            <div key={index} className="sm:col-span-3">
              <label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              <input
                id={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                {...register(field.id as any, { required: field.required })}
              />
              {/* <FormInputError message={errors[field.id] || ""} /> */}
            </div>
          ))}

          <div className="sm:col-span-6">
            <label htmlFor="country">Country</label>
            <select id="country" {...register("country")} autoComplete="country-name">
              <option>Australia</option>
            </select>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="streetAddress">Street address</label>
            <input
              id="streetAddress"
              type="text"
              {...register("streetAddress")}
              autoComplete="street-address"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="city">City</label>
            <input id="city" {...register("city")} type="text" autoComplete="address-level2" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="region">State / Province</label>
            <input id="region" {...register("region")} type="text" autoComplete="address-level1" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="postalCode">ZIP / Postal code</label>
            <input
              id="postalCode"
              {...register("postalCode")}
              type="text"
              autoComplete="postal-code"
            />
          </div>
        </div>
      </Role>
    </>
  )
}
