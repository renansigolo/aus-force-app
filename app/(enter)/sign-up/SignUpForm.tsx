"use client"

import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { AdditionalFields } from "@/app/(enter)/sign-up/AdditionalFields"
import { FormSectionHeading } from "@/app/(enter)/sign-up/FormSectionHeading"
import { SignatureForm } from "@/app/(enter)/sign-up/Signature"
import { Button } from "@/components/Button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card"
import { Divider } from "@/components/Divider"
import { FormInputError } from "@/components/FormInputError"
import { auth, db, upload } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { RegisterFormDefaultValues, TRegisterFormSchema } from "@/lib/schemas"
import { Disclosure } from "@headlessui/react"
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/20/solid"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
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

type SignUpFormProps = {
  role: string
}

export function SignUpForm({ role }: SignUpFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<TRegisterFormSchema>({ defaultValues: RegisterFormDefaultValues })

  const profileImageFileValue = watch("profileImageFile")

  const onSubmit = async (data: TRegisterFormSchema) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.newPassword,
      )

      const imageURL = await upload(
        `users/${userCredential.user.uid}/profile.png`,
        data.profileImageFile?.item(0),
      )
      const signatureURL = await upload(
        `users/${userCredential.user.uid}/signature.png`,
        data.signatureFile,
      )
      const passportURL = await upload(
        `users/${userCredential.user.uid}/passport.png`,
        data.passportImageFile?.item(0),
      )
      const driverLicenseURL = await upload(
        `users/${userCredential.user.uid}/driverLicense.png`,
        data.driverLicenseImageFile?.item(0),
      )
      const identificationURL = await upload(
        `users/${userCredential.user.uid}/identification.png`,
        data.identificationImageFile?.item(0),
      )

      const userPayload = {
        uid: userCredential.user.uid,
        displayName: `${data.firstName} ${data.lastName}`,
        photoURL: imageURL,
      }

      // Update fields in firebase auth and firestore
      await updateProfile(userCredential.user, userPayload)
      await setDoc(doc(db, "users", userCredential.user.uid), {
        driverLicenseNumber: data.driverLicenseNumber,
        driverLicenseIssued: data.driverLicenseIssued,
        driverLicenseExpiry: data.driverLicenseExpiry,
        driverLicenseURL: driverLicenseURL,
        identificationNumber: data.identificationNumber,
        identificationIssued: data.identificationIssued,
        identificationExpiry: data.identificationExpiry,
        identificationURL: identificationURL,
        passportNumber: data.passportNumber,
        passportIssued: data.passportIssued,
        passportExpiry: data.passportExpiry,
        passportURL: passportURL,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        dob: data.dob,
        email: data.email,
        signatureURL: signatureURL,
        role: role,
        ...userPayload,
      })

      // http:localhost:3000/sign-up/business?uid=OTaK8YtowWZm34aPMelztAw9zCb2
      router.push(`/sign-up/${role}?uid=${userCredential.user.uid}`)
      toast.success(`Account created successfully, welcome ${userCredential.user.email}`)
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <EnterHeader
            title="Sign Up"
            description="Enter your details below to sign-up for a new account"
          />
        </CardHeader>
        <CardContent>
          <div>
            {/* Profile Details */}
            <div>
              <FormSectionHeading
                title="Profile Details"
                description="Basic details for your profile"
              />

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="profileImageFile">Profile Photo</label>
                  <div className="flex items-center gap-2">
                    <Image
                      priority
                      width={64}
                      height={64}
                      alt="Profile Image"
                      className="aspect-square h-12 w-12 rounded-full object-fill"
                      src={
                        (profileImageFileValue &&
                          URL.createObjectURL(profileImageFileValue?.item(0) as Blob)) ||
                        "/images/profile-placeholder.png"
                      }
                    />
                    <input
                      id="profileImageFile"
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      className="form-input"
                      {...register("profileImageFile")}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="firstName">
                    First name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    {...register("firstName", { required: "First name is required" })}
                  />
                  <FormInputError message={errors.firstName?.message} />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="lastName">
                    Last name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  <FormInputError message={errors.lastName?.message} />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phoneNumber">
                    Phone number
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    {...register("phoneNumber", { required: "Phone number is required" })}
                  />
                  <FormInputError message={errors.phoneNumber?.message} />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="dob">
                    Date of birthday
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="dob"
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
                          <AdditionalFields
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

            <Divider />

            {/* Account Details */}
            <div>
              <FormSectionHeading
                title="Account Details"
                description="Login details for your account"
              />

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6">
                <div>
                  <label htmlFor="email">
                    Email
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", { required: "Email is required" })}
                  />
                  <FormInputError message={errors.email?.message} />
                </div>

                <div>
                  <label htmlFor="password">
                    Password
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password"
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
                  <label htmlFor="confirmPassword">
                    Confirm password
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="confirmPassword"
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

            {/* <Divider />
          <BusinessForm /> */}
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isSubmitting || !isDirty}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
