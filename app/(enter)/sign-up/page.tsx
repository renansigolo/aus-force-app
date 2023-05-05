"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { auth, db } from "@/lib/firebase"
import { RegisterFormSchema, RegisterFormSchemaType } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Form from "@rjsf/core"
import { RJSFSchema } from "@rjsf/utils"
import validator from "@rjsf/validator-ajv8"
import { FirebaseError } from "firebase/app"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

const schema: RJSFSchema = {
  title: "Personal Details",
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", title: "Title", default: "A new task" },
    done: { type: "boolean", title: "Done?", default: false },
    age: { type: "tel", title: "Age" },
  },
}

const personalForm = [
  {
    required: true,
    id: "firstName",
    label: "First name",
    type: "text",
    autoComplete: "given-name",
  },
  {
    required: true,
    id: "lastName",
    label: "Last Name",
    type: "text",
    autoComplete: "family-name",
  },
  {
    required: true,
    id: "phone",
    label: "Phone Number",
    type: "tel",
    autoComplete: "phone",
  },
  {
    required: true,
    id: "dob",
    label: "Date of birthday",
    type: "date",
    autoComplete: "bday",
  },
]

const businessForm = [
  {
    required: true,
    id: "legalName",
    label: "Legal Name",
    type: "text",
    autoComplete: "company",
  },
  {
    required: true,
    id: "tradingName",
    label: "Trading Name",
    type: "text",
    autoComplete: "organization",
  },
  {
    required: true,
    id: "abn",
    label: "ABN number",
    type: "number",
    autoComplete: "",
  },
  {
    required: false,
    id: "acn",
    label: "ACN number",
    type: "number",
    autoComplete: "",
  },
]

export default function SignUpPage() {
  const router = useRouter()
  const [picture, setPicture] = useState("/images/profile-placeholder.png")
  const [submitting, setSubmitting] = useState(false)
  const log = (type: any) => console.log.bind(console, type)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
  })

  const signUp = async (formData: RegisterFormSchemaType) => {
    setSubmitting(true)

    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    ).then(async (userCredential) => {
      await addDoc(collection(db, "users"), {
        ...formData,
        uid: userCredential.user.uid,
        displayName: `${formData.firstName} ${formData.lastName}`,
      })
        .then(() => {
          router.push("/dashboard")
          toast.success(
            `Account created successfully, welcome ${userCredential.user.email}`
          )
        })
        .catch((error: FirebaseError) => toast.error(error.message))
        .finally(() => setSubmitting(false))
    })
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
      <div className="min-h-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <EnterHeader
          title="Sign Up"
          description="Enter your details below to sign-up for a new account"
        />

        <Form
          schema={schema}
          validator={validator}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")}
        />

        <form
          className="my-12 space-y-8 divide-y divide-gray-200"
          onSubmit={handleSubmit(signUp)}
        >
          <div className="space-y-8 divide-y divide-gray-200">
            {/* Profile Details */}
            <div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This information will be displayed as your profile.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Photo
                  </label>
                  <div className="mt-1 flex items-center">
                    <img
                      src={picture}
                      alt="Profile Image"
                      className="h-12 w-12 rounded-full object-fill"
                    />
                    <input
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
                {personalForm.map((field, index) => (
                  <div key={index} className="sm:col-span-3">
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.label}
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type={field.type}
                        name={field.id}
                        id={field.id}
                        autoComplete={field.autoComplete}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Information */}
            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Business Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the details of your business.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                {businessForm.map((field, index) => (
                  <div key={index} className="sm:col-span-3">
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.label}
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type={field.type}
                        name={field.id}
                        id={field.id}
                        autoComplete={field.autoComplete}
                      />
                    </div>
                  </div>
                ))}

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                    >
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
                      type="text"
                      name="streetAddress"
                      id="streetAddress"
                      autoComplete="street-address"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                    />
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
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div>
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Account Details
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  You&apos;ll use this details to login to your account.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      type="password"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button className="btn btn-primary" disabled={submitting}>
                Register with email
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
