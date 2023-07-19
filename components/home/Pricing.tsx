"use client";

/* This example requires Tailwind CSS v3.0+ */
import { cn } from "@/lib/helpers";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";

const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
];

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    href: "#",
    price: { monthly: "$100", annually: "$1000" },
    description: "The essentials to provide your best work for clients.",
    features: [
      "5 owener's accounts",
      "Up to 10 client's accounts",
      "Basic app support",
    ],
    mostPopular: false,
  },
  {
    name: "Intermediate",
    id: "tier-intermediate",
    href: "#",
    price: { monthly: "$150", annually: "$1500" },
    description: "The essentials to provide your best work for clients.",
    features: [
      "10 owener's accounts",
      "Up to 20 client's accounts",
      "Basic app support",
    ],
    mostPopular: false,
  },
  {
    name: "Advanced",
    id: "tier-advanced",
    href: "#",
    price: { monthly: "$200", annually: "$2000" },
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "20 owener's accounts",
      "Up to 40 client's accounts",
      "Advanced app support",
    ],
    mostPopular: true,
  },
  {
    name: "Ultimate",
    id: "tier-ultimate",
    href: "#",
    price: { monthly: "$400", annually: "$4000" } as any,
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited owener's accounts",
      "Unlimited client's accounts",
      "Advanced app support",
      "Dedicated app support response time",
      "Custom reporting tools",
    ],
    mostPopular: false,
  },
];

export function Pricing() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choose an affordable plan that is packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  cn(
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
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                tier.mostPopular
                  ? "ring-2 ring-indigo-600"
                  : "ring-1 ring-gray-200",
                "rounded-3xl p-8",
              )}
            >
              <h3
                id={tier.id}
                className={cn(
                  tier.mostPopular ? "text-indigo-600" : "text-gray-900",
                  "text-lg font-semibold leading-8",
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {tier.price[frequency.value]}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  {frequency.priceSuffix}
                </span>
              </p>
              <Link
                href={tier.href as any}
                aria-describedby={tier.id}
                className={cn(
                  tier.mostPopular
                    ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                    : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                  "mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                )}
              >
                Buy plan
              </Link>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
