"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { SignatureForm } from "@/app/(enter)/sign-up/Signature"
import { Role } from "@/components/Roles"
import { auth, db } from "@/lib/firebase"
import { cn } from "@/lib/helpers"
import { Disclosure, RadioGroup } from "@headlessui/react"
import { DocumentArrowUpIcon, MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline"
import { FirebaseError } from "firebase/app"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

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

const profileForm = [
  {
    required: "First Name is required",
    name: "firstName",
    id: "firstName",
    label: "First name",
    type: "text",
    autoComplete: "given-name",
  },
  {
    required: "Last Name is required",
    name: "lastName",
    id: "lastName",
    label: "Last name",
    type: "text",
    autoComplete: "family-name",
  },
  {
    required: "Phone Number is required",
    name: "phone",
    id: "phone",
    label: "Phone Number",
    type: "tel",
    autoComplete: "phone",
  },
  {
    required: "Date of birthday is required",
    name: "dob",
    id: "dob",
    label: "Date of birthday",
    type: "date",
    autoComplete: "bday",
  },
]

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

const accountsForm = [
  {
    required: "Email Address is required",
    name: "email",
    id: "email",
    label: "Email Address",
    type: "text",
    autoComplete: "email",
  },
  {
    required: "Password is required",
    name: "password",
    id: "password",
    label: "Password",
    type: "password",
    autoComplete: "password",
  },
  {
    required: "Confirm Password is required",
    name: "confirmPassword",
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    autoComplete: "",
  },
]

const personalForm = [
  {
    required: "",
    name: "Passport",
    id: "passport",
    label: "Passport",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "Driver License",
    id: "driverLicense",
    label: "Driver License",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "ID",
    id: "personalId",
    label: "ID",
    type: "text",
    autoComplete: "",
  },
]

const documentsForm = [
  // {
  //   required: "",
  //   name: "Forklift License",
  //   id: "forkliftLicense",
  //   label: "Forklift License (FL)",
  //   type: "text",
  //   autoComplete: "",
  // },
  // {
  //   required: "",
  //   name: "Order Picker License",
  //   id: "orderPickerLicense",
  //   label: "Order Picker License (LO)",
  //   type: "text",
  //   autoComplete: "",
  // },
  {
    required: "",
    name: "Traffic Controller",
    id: "trafficController",
    label: "Traffic Controller",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "THS Operator",
    id: "thsOperator",
    label: "THS Operator",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "Plant Operator",
    id: "plantOperator",
    label: "Plant Operator",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "High Risk License",
    id: "highRiskLicense",
    label: "High Risk License (HRWL)",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "Other",
    id: "other",
    label: "Other",
    type: "text",
    autoComplete: "",
  },
]

export default function SignUpPage() {
  const router = useRouter()
  const [picture, setPicture] = useState("/images/profile-placeholder.png")
  const [selected, setSelected] = useState(plans[0])
  const [frequency, setFrequency] = useState(frequencies[0])

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm()

  const signUp = async (formData: any) => {
    console.log("🚀 ~ signUp ~ formData:", formData)

    await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(
        async (userCredential) =>
          await addDoc(collection(db, "users"), {
            ...formData,
            uid: userCredential.user.uid,
            displayName: `${formData.firstName} ${formData.lastName}`,
          }).then(() => {
            router.push("/dashboard")
            toast.success(`Account created successfully, welcome ${userCredential.user.email}`)
          })
      )
      .catch((error: FirebaseError) => toast.error(error.message))
  }

  return (
    <>
      <div className="min-h-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <EnterHeader
          title="Sign Up"
          description="Enter your details below to sign-up for a new account"
        />

        <form className="my-12 space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit(signUp)}>
          <div className="space-y-8 divide-y divide-gray-200">
            {/* Profile Details */}
            <div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-500">
                  This information will be displayed as your profile.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="mt-1 flex items-center">
                    <img
                      src={picture}
                      alt="Profile Image"
                      className="h-12 w-12 rounded-full object-fill"
                    />
                    <input
                      // {...register("profileImage")}
                      type="file"
                      className="btn ml-4 w-full"
                      accept="image/x-png,image/gif,image/jpeg"
                      onChange={(e) => {
                        if (!e.target.files) return
                        setPicture(URL.createObjectURL(e.target.files[0]))
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                {profileForm.map((field, index) => (
                  <div key={index} className="sm:col-span-3">
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="mt-1">
                      <input
                        type={field.type}
                        autoComplete={field.autoComplete}
                        {...register(field.id, { required: field.required })}
                      />
                      {errors[field.id] && <span>{String(errors[field.id]?.message)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Information */}
            <div className="py-4">
              <Role role="client">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Business Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Enter the details of your business.</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                  {businessForm.map((field, index) => (
                    <div key={index} className="sm:col-span-3">
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <div className="mt-1">
                        <input
                          type={field.type}
                          autoComplete={field.autoComplete}
                          {...register(field.id, { required: field.required })}
                        />
                        {errors[field.id] && <span>{String(errors[field.id]?.message)}</span>}
                      </div>
                    </div>
                  ))}

                  <div className="sm:col-span-6">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <div className="mt-1">
                      <select {...register("country")} autoComplete="country-name">
                        <option>Australia</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street address
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("streetAddress")}
                        type="text"
                        autoComplete="street-address"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <div className="mt-1">
                      <input {...register("city")} type="text" autoComplete="address-level2" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input {...register("region")} type="text" autoComplete="address-level1" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-1">
                      <input {...register("postalCode")} type="text" autoComplete="postal-code" />
                    </div>
                  </div>
                </div>
              </Role>
            </div>

            {/* Personal Documents */}
            <div>
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Documents</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Personal documents to verify your account
                </p>
              </div>

              <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                {personalForm.map((field, index) => (
                  <Disclosure as="div" className="pt-6" key={index}>
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                            <span className="text-base font-semibold leading-7">{field.label}</span>
                            <span className="ml-6 flex h-7 items-center">
                              {open ? (
                                <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                              ) : (
                                <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>

                        <Disclosure.Panel as="dd" className="mt-2">
                          <p className="text-base leading-7 text-gray-600">
                            <div className="sm:col-span-6">
                              <label
                                htmlFor="passportNumber"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Number
                                <span className="text-red-500">*</span>
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  autoComplete="passport"
                                  {...register("passportNumber", {
                                    required: true,
                                  })}
                                />
                                {errors["passportNumber"] && (
                                  <span>{String(errors["passportNumber"]?.message)}</span>
                                )}
                              </div>

                              <div className="flex gap-2">
                                <div className="mt-2 w-full">
                                  <label
                                    htmlFor="dateIssued"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Date of Issue
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="date"
                                    {...register("dateIssued", {
                                      required: true,
                                    })}
                                  />
                                  {errors["dateIssued"] && (
                                    <span>{String(errors["dateIssued"]?.message)}</span>
                                  )}
                                </div>

                                <div className="mt-2 w-full">
                                  <label
                                    htmlFor="expiryDate"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Expire Date
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="date"
                                    {...register("expiryDate", {
                                      required: true,
                                    })}
                                  />
                                  {errors["expiryDate"] && (
                                    <span>{String(errors["expiryDate"]?.message)}</span>
                                  )}
                                </div>
                              </div>

                              <button
                                type="button"
                                className="relative mt-2 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                <div className="flex flex-col content-center items-center justify-center">
                                  <DocumentArrowUpIcon className="h-12 w-12 text-gray-400" />
                                  <span className="mt-2 block text-sm font-semibold text-gray-900">
                                    Upload Image
                                  </span>
                                </div>
                              </button>
                            </div>
                          </p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>

            {/* Additional Documents */}
            <div>
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Additional Documents
                </h3>
                <p className="mt-1 text-sm text-gray-500">More documents to verify your account</p>
              </div>

              <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                <Role role="worker">
                  {/* White Card */}
                  <Disclosure as="div" className="pt-6">
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                            <span className="text-base font-semibold leading-7">White Card</span>
                            <span className="ml-6 flex h-7 items-center">
                              {open ? (
                                <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                              ) : (
                                <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>

                        <Disclosure.Panel as="dd" className="mt-2">
                          <p className="text-base leading-7 text-gray-600">
                            <div className="sm:col-span-6">
                              <label
                                htmlFor="whiteCardNumber"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Number
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  {...register("whiteCardNumber", {
                                    required: false,
                                  })}
                                />
                                {errors["whiteCardNumber"] && (
                                  <span>{String(errors["whiteCardNumber"]?.message)}</span>
                                )}
                              </div>

                              <div className="mt-2">
                                <label
                                  htmlFor="dateIssued"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Date of Issue
                                </label>
                                <input
                                  type="date"
                                  {...register("whiteCardIssueDate", {
                                    required: false,
                                  })}
                                />
                                {errors["whiteCardIssueDate"] && (
                                  <span>{String(errors["whiteCardIssueDate"]?.message)}</span>
                                )}
                              </div>

                              <button
                                type="button"
                                className="relative mt-2 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                <div className="flex flex-col content-center items-center justify-center">
                                  <DocumentArrowUpIcon className="h-12 w-12 text-gray-400" />
                                  <span className="mt-2 block text-sm font-semibold text-gray-900">
                                    Upload Image
                                  </span>
                                </div>
                              </button>
                            </div>
                          </p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {documentsForm.map((field, index) => (
                    <Disclosure as="div" key={field.label} className="pt-6">
                      {({ open }) => (
                        <>
                          <dt>
                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                              <span className="text-base font-semibold leading-7">
                                {field.label}
                              </span>
                              <span className="ml-6 flex h-7 items-center">
                                {open ? (
                                  <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                ) : (
                                  <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </dt>

                          <Disclosure.Panel as="dd" className="mt-2">
                            <p className="text-base leading-7 text-gray-600">
                              <div key={index} className="sm:col-span-6">
                                {field.id === "other" && (
                                  <div className="mt-2">
                                    <label
                                      htmlFor={field.id}
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      License Name
                                    </label>
                                    <input
                                      type={field.type}
                                      autoComplete={field.autoComplete}
                                      {...register(field.id, {
                                        required: field.required,
                                      })}
                                    />
                                    {errors[field.id] && (
                                      <span>{String(errors[field.id]?.message)}</span>
                                    )}
                                  </div>
                                )}

                                <div className="mt-2">
                                  <label
                                    htmlFor={field.id}
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Number
                                  </label>
                                  <input
                                    type={field.type}
                                    autoComplete={field.autoComplete}
                                    {...register(field.id, {
                                      required: field.required,
                                    })}
                                  />
                                  {errors[field.id] && (
                                    <span>{String(errors[field.id]?.message)}</span>
                                  )}
                                </div>

                                <div className="mt-2">
                                  <label
                                    htmlFor={field.id}
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Class / Type
                                  </label>
                                  <input
                                    type="text"
                                    autoComplete={field.autoComplete}
                                    {...register(field.id, {
                                      required: field.required,
                                    })}
                                  />
                                  {errors[field.id] && (
                                    <span>{String(errors[field.id]?.message)}</span>
                                  )}
                                </div>

                                <div className="flex gap-2">
                                  <div className="mt-2 w-full">
                                    <label
                                      htmlFor={field.id}
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Date of Issue
                                    </label>
                                    <input
                                      type="date"
                                      autoComplete={field.autoComplete}
                                      {...register(field.id, {
                                        required: field.required,
                                      })}
                                    />
                                    {errors[field.id] && (
                                      <span>{String(errors[field.id]?.message)}</span>
                                    )}
                                  </div>

                                  <div className="mt-2 w-full">
                                    <label
                                      htmlFor={field.id}
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Expire Date
                                    </label>
                                    <input
                                      type="date"
                                      autoComplete={field.autoComplete}
                                      {...register(field.id, {
                                        required: field.required,
                                      })}
                                    />
                                    {errors[field.id] && (
                                      <span>{String(errors[field.id]?.message)}</span>
                                    )}
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  className="relative mt-2 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  <div className="flex flex-col content-center items-center justify-center">
                                    <DocumentArrowUpIcon className="h-12 w-12 text-gray-400" />
                                    <span className="mt-2 block text-sm font-semibold text-gray-900">
                                      Upload Image
                                    </span>
                                  </div>
                                </button>
                              </div>
                            </p>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </Role>
              </dl>
            </div>

            {/* Plan Details */}
            <Role role="business">
              <div className="py-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Plan Details</h3>
                <p className="mt-1 text-sm text-gray-500">The details for the plan selected</p>
              </div>

              <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
                <div className="relative -space-y-px rounded-md bg-white">
                  {plans.map((plan, planIdx) => (
                    <RadioGroup.Option
                      key={plan.name}
                      value={plan}
                      className={({ checked }) =>
                        classNames(
                          planIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                          planIdx === plans.length - 1 ? "rounded-bl-md rounded-br-md" : "",
                          checked ? "z-10 border-indigo-200 bg-indigo-50" : "border-gray-200",
                          "relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6"
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <span className="flex items-center text-sm">
                            <span
                              className={classNames(
                                checked
                                  ? "border-transparent bg-indigo-600"
                                  : "border-gray-300 bg-white",
                                active ? "ring-2 ring-indigo-600 ring-offset-2" : "",
                                "flex h-4 w-4 items-center justify-center rounded-full border"
                              )}
                              aria-hidden="true"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            </span>
                            <RadioGroup.Label
                              as="span"
                              className={classNames(
                                checked ? "text-indigo-900" : "text-gray-900",
                                "ml-3 font-medium"
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
                              className={classNames(
                                checked ? "text-indigo-900" : "text-gray-900",
                                "font-medium"
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
                            className={classNames(
                              checked ? "text-indigo-700" : "text-gray-500",
                              "ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
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
                        cn(
                          checked ? "bg-indigo-600 text-white" : "text-gray-500",
                          "cursor-pointer rounded-full px-2.5 py-1"
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
                  <div className="mt-2 -space-y-px rounded-md bg-white shadow-sm">
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
                    <div className="flex -space-x-px">
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
                  <div className="mt-2 -space-y-px rounded-md shadow-sm">
                    <div>
                      <label htmlFor="country" className="sr-only">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
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
                        className="relative block w-full rounded-none rounded-b-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="ZIP / Postal code"
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </Role>

            {/* Account Details */}
            <div>
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Account Details</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You&apos;ll use this details to login to your account.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                {accountsForm.map((field, index) => (
                  <div key={index} className="sm:col-span-6">
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="mt-1">
                      <input
                        type={field.type}
                        autoComplete={field.autoComplete}
                        {...register(field.id, { required: field.required })}
                      />
                      {errors[field.id] && <span>{String(errors[field.id]?.message)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature */}
            <div>
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Signature</h3>
                <p className="mt-1 text-sm text-gray-500">Give us your autograph</p>
              </div>

              <div className="mt-6 grid w-full grid-cols-1 justify-center gap-x-4 gap-y-6">
                <SignatureForm />
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button className="btn btn-primary" disabled={isSubmitting || !isDirty}>
                Register with email
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
