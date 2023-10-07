"use client"

import { DatabaseUser } from "@/app/dashboard/profile/page"
import { Button } from "@/components/Button"
import { FormInputError } from "@/components/FormInputError"
import { updateDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type CreditCardValues = {
  cardName: string
  cardNumber: string
  cardExpire: string
  cardCvc: number
}

type CreditCardFormValues = {
  user: DatabaseUser
}

export function CreditCardForm({ user }: CreditCardFormValues) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreditCardValues>({
    defaultValues: {
      cardName: "",
      cardNumber: "",
      cardExpire: "",
      cardCvc: undefined,
      ...user,
    },
  })

  const onSubmit = async (values: CreditCardValues) => {
    try {
      await updateDocument("users", user.uid, values)
      router.refresh()
      toast.success("Credit card details submitted successfully")
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div className="col-span-full">
          <label htmlFor="cardName">Cardholder name</label>
          <input
            id="cardHolder"
            type="text"
            disabled={isSubmitting}
            placeholder="Full name on card"
            autoComplete="cc-name"
            {...register("cardName", { required: "Card holder name is required" })}
          />
          <FormInputError message={errors.cardName?.message} />
        </div>

        <div className="col-span-full">
          <label htmlFor="cardNumber">Card number</label>
          <input
            id="cardNumber"
            type="text"
            disabled={isSubmitting}
            placeholder="1234 1234 1234 1234"
            autoComplete="cc-number"
            {...register("cardNumber", { required: "Card number is required" })}
          />
          <FormInputError message={errors.cardNumber?.message} />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="cardExpire">Card Expire</label>
          <input
            id="cardExpire"
            type="text"
            disabled={isSubmitting}
            placeholder="MM/YY"
            autoComplete="cc-exp"
            {...register("cardExpire", {
              required: "Expire date is required",
              // must follow the format MM/YY
              pattern: {
                value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                message: "Expire date must follow the format MM/YY",
              },
            })}
          />
          <FormInputError message={errors.cardExpire?.message} />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="cardCvc">CVC</label>
          <input
            id="cardCvc"
            type="number"
            disabled={isSubmitting}
            placeholder="CVC"
            autoComplete="cc-csc"
            {...register("cardCvc", {
              required: "CVC number is required",
              valueAsNumber: true,
              validate: (value) => value.toString().length === 3 || "CVC must be 3 digits",
            })}
          />
          <FormInputError message={errors.cardCvc?.message} />
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
