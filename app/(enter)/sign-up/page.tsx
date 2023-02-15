"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { auth, db } from "@/lib/firebase"
import { FirebaseError } from "firebase/app"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"
import { toast } from "react-hot-toast"

export default function SignUpPage() {
  const router = useRouter()

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Read the form data
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries()) as any
    console.log("🚀 ~ handleSignUp ~ formJson", formJson)

    await createUserWithEmailAndPassword(
      auth,
      formJson.email,
      formJson.password
    ).then(async (userCredential) => {
      await addDoc(collection(db, "users"), {
        ...formJson,
        uid: userCredential.user.uid,
        displayName: `${formJson.firstName} ${formJson.lastName}`,
      })
        .then((res) => {
          console.log("🚀 ~ awaitset ~ res", res)
          router.push("/dashboard")
          toast.success(
            `Account created successfully, welcome ${userCredential.user.email}`
          )
        })
        .catch((error: FirebaseError) => toast.error(error.message))
    })
  }

  return (
    <>
      <EnterHeader
        title="Sign Up"
        description="Enter your details below to sign-up for a new account"
      />
      <form
        className="my-12 space-y-8 divide-y divide-gray-200"
        onSubmit={handleSignUp}
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

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <button type="button" className="btn ml-4">
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    className="register-form-input"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    className="register-form-input"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="tel"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="tel"
                    name="tel"
                    type="tel"
                    autoComplete="phone"
                    className="register-form-input"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of birthday
                </label>
                <div className="mt-1">
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    autoComplete="bday"
                    className="register-form-input"
                  />
                </div>
              </div>
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
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="legal-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Legal name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="legalName"
                    id="legalName"
                    autoComplete="company"
                    className="register-form-input"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="trading-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Trading name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="tradingName"
                    id="tradingName"
                    autoComplete="organization"
                    className="register-form-input"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="abn"
                  className="block text-sm font-medium text-gray-700"
                >
                  ABN number
                </label>
                <div className="mt-1">
                  <input
                    id="abn"
                    name="abn"
                    type="number"
                    autoComplete="abn"
                    className="register-form-input"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="acn"
                  className="block text-sm font-medium text-gray-700"
                >
                  ACN number
                </label>
                <div className="mt-1">
                  <input
                    id="acn"
                    name="acn"
                    type="number"
                    autoComplete="acn"
                    className="register-form-input"
                  />
                </div>
              </div>

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
                    className="register-form-input"
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
                    className="register-form-input"
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
                    className="register-form-input"
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
                    className="register-form-input"
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
                    className="register-form-input"
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

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="register-form-input"
                    required
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
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    className="register-form-input"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button className="btn btn-primary">Register with email</button>
            <Link
              href="/dashboard"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </form>
    </>
  )
}
