"use client"

import { DatabaseUser } from "@/app/dashboard/profile/page"
import { Button } from "@/components/Button"
import { FormInputError } from "@/components/FormInputError"
import { updateDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type BankFormValues = {
  bankName: string
  accountName: string
  bsb: number
  accountNumber: number
}

type BankFormProps = {
  user: DatabaseUser
}

export function BankForm({ user }: BankFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BankFormValues>({ defaultValues: user })

  const onSubmit = async (values: BankFormValues) => {
    try {
      await updateDocument("users", user.uid, values)
      router.refresh()
      toast.success("Bank details submitted successfully")
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div className="col-span-full">
          <label htmlFor="bankName">Bank name</label>
          <select
            id="bankName"
            {...register("bankName", { required: "Bank name is required" })}
            defaultValue="UBank"
            disabled={isSubmitting}
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
            <option>Revolut</option>
            <option>St. George Bank</option>
            <option>Suncorp Bank Bankwest</option>
            <option>UBank</option>
            <option>Westpac</option>
          </select>
          <FormInputError message={errors.bankName?.message} />
        </div>

        <div className="col-span-full">
          <label htmlFor="accountName">Account name</label>
          <input
            id="accountName"
            type="text"
            disabled={isSubmitting}
            {...register("accountName", { required: "Account name is required" })}
          />
          <FormInputError message={errors.accountName?.message} />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="bsb">BSB</label>
          <input
            id="bsb"
            type="number"
            disabled={isSubmitting}
            {...register("bsb", {
              required: "BNB number is required",
              valueAsNumber: true,
              validate: (value) => value.toString().length === 6 || "BSB must be 6 digits",
            })}
          />
          <FormInputError message={errors.bsb?.message} />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="accountNumber">Account number</label>
          <input
            id="accountNumber"
            type="number"
            disabled={isSubmitting}
            {...register("accountNumber", {
              required: "Account number is required",
              valueAsNumber: true,
              validate: (value) =>
                value.toString().length === 9 || "Account number must be 9 digits",
            })}
          />
          <FormInputError message={errors.accountNumber?.message} />
        </div>
      </div>

      <div className="mt-8 flex">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </Button>
      </div>
    </form>
  )
}
