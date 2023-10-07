"use client"

import { FormSectionHeading } from "@/app/(enter)/sign-up/FormSectionHeading"
import { Button } from "@/components/Button"
import { CardFooter } from "@/components/Card"
import { updateDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { RegisterClientFormDefaultValues, TRegisterClientFormDefaultValues } from "@/lib/schemas"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { isDirty } from "zod"

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

export function ClientForm({ uid }: { uid: string }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterClientFormDefaultValues>({ defaultValues: RegisterClientFormDefaultValues })

  const onSubmit = async (values: TRegisterClientFormDefaultValues) => {
    try {
      await updateDocument("users", uid, values)
      router.push("/dashboard")
      toast.success("Client details submitted successfully")
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Role role="client"> */}
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
            {/* <FormInputError message={errors?[field.id] && undefined : ""} /> */}
          </div>
        ))}

        <div className="sm:col-span-6">
          <label htmlFor="country">Country</label>
          <select id="country" {...register("country")} autoComplete="country-name">
            <option>Australia</option>
          </select>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="street">Street address</label>
          <input id="street" type="text" {...register("street")} autoComplete="street-address" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="city">City</label>
          <input id="city" {...register("city")} type="text" autoComplete="address-level2" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="state">State / Province</label>
          <input id="state" {...register("state")} type="text" autoComplete="address-level1" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="postcode">ZIP / Postcode</label>
          <input id="postcode" {...register("postcode")} type="text" autoComplete="postal-code" />
        </div>
      </div>
      {/* </Role> */}
      <CardFooter>
        <Button disabled={isSubmitting || !isDirty}>
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </CardFooter>
    </form>
  )
}
