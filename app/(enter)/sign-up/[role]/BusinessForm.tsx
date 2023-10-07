"use client"

import { FormSectionHeading } from "@/app/(enter)/sign-up/FormSectionHeading"
import { Button } from "@/components/Button"
import { CardFooter } from "@/components/Card"
import { Divider } from "@/components/Divider"
import { FormInputError } from "@/components/FormInputError"
import { updateDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import {
  RegisterBusinessFormDefaultValues,
  TRegisterBusinessFormDefaultValues,
} from "@/lib/schemas"
import { RadioGroup } from "@headlessui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { twMerge } from "tailwind-merge"
import { isDirty } from "zod"

const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
]

const plans = [
  {
    id: "basic",
    name: "Basic",
    priceMonthly: 100,
    priceYearly: 1000,
    limit: "Up to 5 owner's and 10 client's",
  },
  {
    id: "intermediate",
    name: "Intermediate",
    priceMonthly: 150,
    priceYearly: 1500,
    limit: "Up to 10 owner's and 20 client's",
  },
  {
    id: "advanced",
    name: "Advanced",
    priceMonthly: 200,
    priceYearly: 2000,
    limit: "Up to 20 owner's and 40 client's",
  },

  {
    id: "ultimate",
    name: "Ultimate",
    priceMonthly: 400,
    priceYearly: 4000,
    limit: "Unlimited owner's and client's",
  },
]

export function BusinessForm({ uid }: { uid: string }) {
  const [selected, setSelected] = useState(plans[0])
  const [frequency, setFrequency] = useState(frequencies[0])

  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterBusinessFormDefaultValues>({
    defaultValues: RegisterBusinessFormDefaultValues,
  })

  const onSubmit = async (values: TRegisterBusinessFormDefaultValues) => {
    console.log("🚀 ~ onSubmit ~ values:", values)
    try {
      await updateDocument("users", uid, values)
      router.push("/dashboard")
      toast.success("Business details submitted successfully")
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Plan Details */}
      {/* <Role role="business"> */}
      <div className="grid gap-4">
        <FormSectionHeading title="Plan Details" description="The details for the plan selected" />

        <div className="flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={(item) => {
              setFrequency(item)
              setValue("planFrequency", item.value)
            }}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  twMerge(
                    checked ? "bg-indigo-600 text-white" : "text-gray-500",
                    "cursor-pointer rounded-full px-2.5 py-1",
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>

        <RadioGroup
          value={selected}
          onChange={(item) => {
            setSelected(item)
            setValue("planId", item.id)
          }}
        >
          <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
          <div className="relative -space-y-px rounded-md bg-white">
            {plans.map((plan, planIdx) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ checked }) =>
                  twMerge(
                    planIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                    planIdx === plans.length - 1 ? "rounded-bl-md rounded-br-md" : "",
                    checked ? "z-10 border-indigo-200 bg-indigo-50" : "border-gray-200",
                    "relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6",
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span className="flex items-center text-sm">
                      <span
                        aria-hidden="true"
                        className={twMerge(
                          checked ? "border-transparent bg-indigo-600" : "border-gray-300 bg-white",
                          active ? "ring-2 ring-indigo-600 ring-offset-2" : "",
                          "flex h-4 w-4 items-center justify-center rounded-full border",
                        )}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                      <RadioGroup.Label
                        as="span"
                        className={twMerge(
                          checked ? "text-indigo-900" : "text-gray-900",
                          "ml-3 font-medium",
                        )}
                      >
                        {plan.name}
                      </RadioGroup.Label>
                    </span>
                    <RadioGroup.Description
                      as="span"
                      className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                    >
                      <span
                        className={twMerge(
                          checked ? "text-indigo-900" : "text-gray-900",
                          "font-medium",
                        )}
                      >
                        ${plan.priceMonthly} / mo
                      </span>{" "}
                      <span className={checked ? "text-indigo-700" : "text-gray-500"}>
                        (${plan.priceYearly} / yr)
                      </span>
                    </RadioGroup.Description>
                    <RadioGroup.Description
                      as="span"
                      className={twMerge(
                        checked ? "text-indigo-700" : "text-gray-500",
                        "ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right",
                      )}
                    >
                      {plan.limit}
                    </RadioGroup.Description>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Divider />

      <div>
        <FormSectionHeading title="Credit Card Details" description="Your credit card details" />

        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
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
                validate: (value) => value?.toString().length === 3 || "CVC must be 3 digits",
              })}
            />
            <FormInputError message={errors.cardCvc?.message} />
          </div>
        </div>
      </div>

      <Divider />

      {/* Terms and Conditions */}
      <div className="grid gap-4">
        <FormSectionHeading
          title="Terms and Conditions"
          description="Upload a contract to be accepeted by the workers"
        />

        <div>
          <label htmlFor="termsAndConditions">Terms and conditions</label>
          <input id="termsAndConditions" type="file" accept=".pdf" className="form-input" />
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
