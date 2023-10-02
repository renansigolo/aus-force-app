"use client"

import { FormSectionHeading } from "@/app/(enter)/sign-up/FormSectionHeading"
import { Role } from "@/components/Roles"
import { RadioGroup } from "@headlessui/react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
]

const plans = [
  {
    name: "Basic",
    priceMonthly: 100,
    priceYearly: 1000,
    limit: "Up to 5 owener's and 10 client's",
  },
  {
    name: "Intermediate",
    priceMonthly: 150,
    priceYearly: 1500,
    limit: "Up to 10 owener's and 20 client's",
  },
  {
    name: "Advanced",
    priceMonthly: 200,
    priceYearly: 2000,
    limit: "Up to 20 owener's and 40 client's",
  },

  {
    name: "Ultimate",
    priceMonthly: 400,
    priceYearly: 4000,
    limit: "Unlimited owener's and client's",
  },
]

export function BusinessForm() {
  const [selected, setSelected] = useState(plans[0])
  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <>
      {/* Plan Details */}
      <Role role="business">
        <div className="grid gap-4">
          <FormSectionHeading
            title="Plan Details"
            description="The details for the plan selected"
          />
          <RadioGroup value={selected} onChange={setSelected}>
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
                            checked
                              ? "border-transparent bg-indigo-600"
                              : "border-gray-300 bg-white",
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

        <p className="mb-3 mt-6 block text-sm font-medium leading-6 text-gray-900">
          Payment frequency
        </p>
        <div className="flex">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
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

        <div className="mt-10">
          <fieldset>
            <legend className="block text-sm font-medium leading-6 text-gray-900">
              Card Details
            </legend>
            <div className="mt-2 flex flex-col gap-2">
              <div>
                <label htmlFor="card-number" className="sr-only">
                  Card number
                </label>
                <input
                  type="text"
                  name="card-number"
                  id="card-number"
                  className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Card number"
                />
              </div>
              <div className="flex gap-2">
                <div className="w-1/2 min-w-0 flex-1">
                  <label htmlFor="card-expiration-date" className="sr-only">
                    Expiration date
                  </label>
                  <input
                    type="text"
                    name="card-expiration-date"
                    id="card-expiration-date"
                    className="relative block w-full rounded-none rounded-bl-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="MM / YY"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <label htmlFor="card-cvc" className="sr-only">
                    CVC
                  </label>
                  <input
                    type="text"
                    name="card-cvc"
                    id="card-cvc"
                    className="relative block w-full rounded-none rounded-br-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="CVC"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="mt-6 bg-white">
            <legend className="block text-sm font-medium leading-6 text-gray-900">
              Billing address
            </legend>
            <div className="mt-2 flex flex-col gap-1 rounded-md shadow-sm">
              <div>
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select id="country" name="country" autoComplete="country-name">
                  <option>Australia</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
              <div>
                <label htmlFor="postal-code" className="sr-only">
                  ZIP / Postal code
                </label>
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  placeholder="ZIP / Postal code"
                />
              </div>
            </div>
          </fieldset>
        </div>

        {/* Terms and Conditions */}
        <div className="grid gap-4">
          <div className="pt-8">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Terms and Conditions</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload a contract to be accepeted by the workers
            </p>
          </div>

          <div>
            <label htmlFor="termsAndConditions">Terms and conditions</label>
            <input id="termsAndConditions" type="file" accept=".pdf" className="form-input" />
          </div>
        </div>
      </Role>
    </>
  )
}
