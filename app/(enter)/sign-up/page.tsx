"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { auth, db } from "@/lib/firebase"
import { FirebaseError } from "firebase/app"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "react-hot-toast"

export default function SignUpPage() {
  const router = useRouter()
  const [picture, setPicture] = useState("/images/profile-placeholder.png")
  const [submitting, setSubmitting] = useState(false)

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    // Read the form data
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries()) as any

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
      <div className="min-h-full bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                      required
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
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
