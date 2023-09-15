"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { Divider } from "@/app/(enter)/sign-up/Divider"
import { FormSectionHeading } from "@/app/(enter)/sign-up/FormSectionHeading"
import { SignatureForm } from "@/app/(enter)/sign-up/Signature"
import { FormInputError } from "@/components/FormInputError"
import { Loader } from "@/components/Loader"
import { auth, db } from "@/lib/firebase"
import { TRegisterFormSchema } from "@/lib/schemas"
import { Disclosure } from "@headlessui/react"
import { DocumentArrowUpIcon, MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/20/solid"
import { FirebaseError } from "firebase/app"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"

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

export default function SignUpPage() {
  const router = useRouter()
  const [previewImage, setPreviewImage] = useState("/images/profile-placeholder.png")

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<TRegisterFormSchema>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      dob: "",
      profileImage: "",
      passportNumber: "",
      passportIssued: "",
      passportExpiry: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: TRegisterFormSchema) => {
    console.log("🚀 ~ onSubmit ~ data:", data)

    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(
        async (userCredential) =>
          await addDoc(collection(db, "users"), {
            ...data,
            uid: userCredential.user.uid,
            displayName: `${data.firstName} ${data.lastName}`,
          }).then(() => {
            router.push("/dashboard")
            toast.success(`Account created successfully, welcome ${userCredential.user.email}`)
          }),
      )
      .catch((error: FirebaseError) => toast.error(error.message))
  }

  return (
    <div className="min-h-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
      <EnterHeader
        title="Sign Up"
        description="Enter your details below to sign-up for a new account"
      />

      <form className="my-12 space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Profile Details */}
          <div>
            <FormSectionHeading
              title="Profile Details"
              description="Basic details for your profile"
            />

            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <img
                    src={previewImage}
                    alt="Profile Image"
                    className="aspect-square h-12 w-12 rounded-full object-fill"
                  />

                  <Controller
                    name="profileImage" // This should match the name of your form field
                    control={control}
                    render={({ field: { onChange, name } }) => (
                      <input
                        name={name}
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg"
                        className="btn ml-4 w-full"
                        onChange={(event) => {
                          onChange(event)
                          if (!event.target.files) return
                          const fileUrl = URL.createObjectURL(event.target.files[0])
                          setValue("profileImage", fileUrl)
                          setPreviewImage(fileUrl)
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("firstName", { required: "First name is required" })}
                />
                <FormInputError message={errors.firstName?.message} />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("lastName", { required: "Last name is required" })}
                />
                <FormInputError message={errors.lastName?.message} />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: "Phone number is required" })}
                />
                <FormInputError message={errors.phone?.message} />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="dob" className="form-label">
                  Date of birthday
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  autoComplete="bday"
                  {...register("dob", {
                    required: "Date of birthday is required",
                    validate: (value) =>
                      new Date(value) <
                        new Date(new Date().setFullYear(new Date().getFullYear() - 18)) ||
                      "You must be at least 18 years old",
                  })}
                />
                <FormInputError message={errors.dob?.message} />
              </div>
            </div>
          </div>

          <Divider />

          {/* Personal Documents */}
          <div>
            <FormSectionHeading
              title="Personal Documents"
              description="Personal documents to verify your account"
            />

            <dl className="space-y-6 divide-y divide-gray-900/10">
              {personalForm.map((field, index) => (
                <Disclosure key={index} as="div" className="pt-6">
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
                              <input type="text" {...register("passportNumber")} />
                              <FormInputError message={errors.passportNumber?.message} />
                            </div>

                            <div className="flex gap-2">
                              <div className="mt-2 w-full">
                                <label
                                  htmlFor="passportIssued"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Date of Issue
                                  <span className="text-red-500">*</span>
                                </label>
                                <input type="date" {...register("passportIssued")} />
                                <FormInputError message={errors.passportIssued?.message} />
                              </div>

                              <div className="mt-2 w-full">
                                <label
                                  htmlFor="passportExpiry"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Expiry Date
                                  <span className="text-red-500">*</span>
                                </label>
                                <input type="date" {...register("passportExpiry")} />
                                <FormInputError message={errors.passportExpiry?.message} />
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

          {/* <ClientForm />
          <WorkerForm />
          <BusinessForm /> */}

          <Divider />

          {/* Account Details */}
          <div>
            <FormSectionHeading
              title="Account Details"
              description="Login details for your account"
            />

            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6">
              <div>
                <label htmlFor="email" className="form-label">
                  Email
                  <span className="text-red-500">*</span>
                </label>
                <input type="email" {...register("email", { required: "Email is required" })} />
                <FormInputError message={errors.email?.message} />
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Password
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <FormInputError message={errors.password?.message} />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === getValues("password") || "Passwords do not match",
                  })}
                />
                <FormInputError message={errors.confirmPassword?.message} />
              </div>
            </div>
          </div>

          <Divider />

          {/* Signature */}
          <div>
            <FormSectionHeading
              title="Signature"
              description="Use your mouse or finger to draw your signature below"
            />
            <SignatureForm />
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <button
            className="btn btn-primary disabled:opacity-60"
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting && <Loader show />}Register
          </button>
        </div>
      </form>
    </div>
  )
}
