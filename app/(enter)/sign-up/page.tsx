"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { FormSectionHeading } from "@/app/(enter)/sign-up/FormSectionHeading"
import { SignatureForm } from "@/app/(enter)/sign-up/Signature"
import { Divider } from "@/components/Divider"
import { FormInputError } from "@/components/FormInputError"
import { Loader } from "@/components/Loader"
import { auth, db, storage } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { RegisterFormDefaultValues, TRegisterFormSchema } from "@/lib/schemas"
import { Disclosure } from "@headlessui/react"
import { DocumentArrowUpIcon, MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/20/solid"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useRouter } from "next/navigation"
import { Controller, UseFormReturn, useForm } from "react-hook-form"
import toast from "react-hot-toast"

const personalForm = [
  {
    id: "passport",
    label: "Passport",
  },
  {
    id: "driverLicense",
    label: "Driver License",
  },
  {
    id: "identification",
    label: "ID",
  },
]

export default function SignUpPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<TRegisterFormSchema>({ defaultValues: RegisterFormDefaultValues })

  const imageValue = getValues("profileImageFile")

  const onSubmit = async (data: TRegisterFormSchema) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.newPassword,
      )

      let imageSnapshot = null
      let signatureSnapshot = null

      if (data.profileImageFile) {
        // Upload image to firebase storage
        const storageRef = ref(storage, `users/${userCredential.user.uid}/profile.png`)
        imageSnapshot = await uploadBytes(storageRef, data.profileImageFile)
      }

      if (data.signatureFile) {
        // Upload image to firebase storage
        const storageRef = ref(storage, `users/${userCredential.user.uid}/signature.png`)
        signatureSnapshot = await uploadBytes(storageRef, data.signatureFile)
      }

      const userPayload = {
        uid: userCredential.user.uid,
        displayName: `${data.firstName} ${data.lastName}`,
        photoURL: await getDownloadURL(ref(storage, imageSnapshot?.ref.fullPath || "")),
      }

      // Update fields in firebase auth and firestore
      await updateProfile(userCredential.user, userPayload)
      await setDoc(doc(db, "users", userCredential.user.uid), {
        driverLicenseNumber: data.driverLicenseNumber,
        driverLicenseIssued: data.driverLicenseIssued,
        driverLicenseExpiry: data.driverLicenseExpiry,
        identificationNumber: data.identificationNumber,
        identificationIssued: data.identificationIssued,
        identificationExpiry: data.identificationExpiry,
        passportNumber: data.passportNumber,
        passportIssued: data.passportIssued,
        passportExpiry: data.passportExpiry,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        dob: data.dob,
        email: data.email,
        signatureURL: await getDownloadURL(ref(storage, signatureSnapshot?.ref.fullPath || "")),
        role: "client",
        ...userPayload,
      })

      router.push("/dashboard")
      toast.success(`Account created successfully, welcome ${userCredential.user.email}`)
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <div className="min-h-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
      <EnterHeader
        title="Sign Up"
        description="Enter your details below to sign-up for a new account"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Profile Details */}
          <div>
            <FormSectionHeading
              title="Profile Details"
              description="Basic details for your profile"
            />

            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="photo" className="form-label">
                  Photo
                </label>
                <div className="flex items-center">
                  <img
                    alt="Profile Image"
                    className="aspect-square h-12 w-12 rounded-full object-fill"
                    src={
                      (imageValue && URL.createObjectURL(imageValue)) ||
                      "/images/profile-placeholder.png"
                    }
                  />

                  <Controller
                    name="profileImageFile"
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
                          const imageFile = event.target.files[0]
                          setValue("profileImageFile", imageFile)
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
                  First name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="given-name"
                  {...register("firstName", { required: "First name is required" })}
                />
                <FormInputError message={errors.firstName?.message} />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="lastName" className="form-label">
                  Last name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="family-name"
                  {...register("lastName", { required: "Last name is required" })}
                />
                <FormInputError message={errors.lastName?.message} />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone number
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  autoComplete="tel"
                  {...register("phoneNumber", { required: "Phone number is required" })}
                />
                <FormInputError message={errors.phoneNumber?.message} />
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

              {/* <div className="col-span-full">
                <label htmlFor="email" className="form-label">
                  Job title
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="organization-title"
                  {...register("jobTitle", { required: "Job title is required" })}
                />
              </div> */}
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
                        <Fields
                          register={register}
                          inputValues={
                            {
                              numberId: `${field.id}Number`,
                              dateOfIssueId: `${field.id}Issued`,
                              expiryDateId: `${field.id}Expiry`,
                            } as any
                          }
                        />
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
                <input
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: "Email is required" })}
                />
                <FormInputError message={errors.email?.message} />
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Password
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  {...register("newPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <FormInputError message={errors.newPassword?.message} />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm password
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === getValues("newPassword") || "Passwords do not match",
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
            <SignatureForm setValue={setValue} />
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <button
            className="btn btn-primary disabled:opacity-60"
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? (
              <>
                <Loader show />
                <p>Registering...</p>
              </>
            ) : (
              <p>Register</p>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

type FieldsProps = {
  register: UseFormReturn<any>["register"]
  inputValues: {
    numberId: string
    dateOfIssueId: string
    expiryDateId: string
  }
}

function Fields({ register, inputValues }: FieldsProps) {
  console.log("🚀 ~ Fields ~ inputValues:", inputValues)
  return (
    <>
      <div>
        <label htmlFor={inputValues.numberId} className="form-label">
          Number
        </label>
        <input type="text" {...register(inputValues.numberId)} />
        {/* <FormInputError message={errors.inputValues.numberId?.message} /> */}
      </div>

      <div className="flex gap-2">
        <div className="mt-2 w-full">
          <label htmlFor={inputValues.dateOfIssueId} className="form-label">
            Date of Issue
          </label>
          <input type="date" {...register(inputValues.dateOfIssueId)} />
          {/* <FormInputError message={errors.inputValues.dateOfIssueId?.message} /> */}
        </div>

        <div className="mt-2 w-full">
          <label htmlFor={inputValues.expiryDateId} className="form-label">
            Expiry Date
          </label>
          <input type="date" {...register(inputValues.expiryDateId)} />
          {/* <FormInputError message={errors.inputValues.expiryDateId?.message} /> */}
        </div>
      </div>

      <button
        type="button"
        className="relative mt-2 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <div className="flex flex-col content-center items-center justify-center">
          <DocumentArrowUpIcon className="h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">Upload Image</span>
        </div>
      </button>
    </>
  )
}
