"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { Container } from "@/components/Container"
import { Role } from "@/components/Roles"
import { auth, db } from "@/lib/firebase"
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline"
import { FirebaseError } from "firebase/app"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

const personalForm = [
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

const documentsForm = [
  {
    required: "Your ID or Passport is required",
    name: "passport",
    id: "passport",
    label: "ID / Passport",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "White Card",
    id: "whiteCard",
    label: "White Card",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "Forklift License",
    id: "forkliftLicense",
    label: "Forklift License (FL)",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "Forklift License",
    id: "forkliftLicense",
    label: "Forklift License (FL)",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "Order Picker License",
    id: "orderPickerLicense",
    label: "Order Picker License (LO)",
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

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm()

  const signUp = async (formData: any) => {
    console.log("🚀 ~ signUp ~ formData:", formData)

    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    )
      .then(
        async (userCredential) =>
          await addDoc(collection(db, "users"), {
            ...formData,
            uid: userCredential.user.uid,
            displayName: `${formData.firstName} ${formData.lastName}`,
          }).then(() => {
            router.push("/dashboard")
            toast.success(
              `Account created successfully, welcome ${userCredential.user.email}`
            )
          })
      )
      .catch((error: FirebaseError) => toast.error(error.message))
  }

  return (
    <Container>
      <div className="min-h-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <EnterHeader
          title="Sign Up"
          description="Enter your details below to sign-up for a new account"
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
                {personalForm.map((field, index) => (
                  <div key={index} className="sm:col-span-3">
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <div className="mt-1">
                      <input
                        type={field.type}
                        autoComplete={field.autoComplete}
                        {...register(field.id, { required: field.required })}
                      />
                      {errors[field.id] && (
                        <span>{String(errors[field.id]?.message)}</span>
                      )}
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
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <div className="mt-1">
                        <input
                          type={field.type}
                          autoComplete={field.autoComplete}
                          {...register(field.id, { required: field.required })}
                        />
                        {errors[field.id] && (
                          <span>{String(errors[field.id]?.message)}</span>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <div className="mt-1">
                      <select
                        {...register("country")}
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
                        {...register("streetAddress")}
                        type="text"
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
                        {...register("city")}
                        type="text"
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
                        {...register("region")}
                        type="text"
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
                        {...register("postalCode")}
                        type="text"
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>
                </div>
              </Role>
            </div>

            {/* Additional Documents */}
            <div>
              <Role role="worker">
                <div className="pt-8">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Additional Documents
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    More documents to verify your account
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                  {documentsForm.map((field, index) => (
                    <div key={index} className="sm:col-span-6">
                      <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {field.label}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <div className="mt-1">
                        <input
                          type={field.type}
                          autoComplete={field.autoComplete}
                          {...register(field.id, { required: field.required })}
                        />
                        {errors[field.id] && (
                          <span>{String(errors[field.id]?.message)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Role>
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
                {accountsForm.map((field, index) => (
                  <div key={index} className="sm:col-span-6">
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <div className="mt-1">
                      <input
                        type={field.type}
                        autoComplete={field.autoComplete}
                        {...register(field.id, { required: field.required })}
                      />
                      {errors[field.id] && (
                        <span>{String(errors[field.id]?.message)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature */}
            <div>
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Signature
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Give us your autograph
                </p>
              </div>

              <div className="mt-6 grid w-full grid-cols-1 justify-center gap-x-4 gap-y-6">
                <button
                  type="button"
                  className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <div className="flex flex-col content-center items-center justify-center">
                    <DocumentArrowUpIcon className="h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-semibold text-gray-900">
                      Upload your signature
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                className="btn btn-primary"
                disabled={isSubmitting || !isDirty}
              >
                Register with email
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  )
}
