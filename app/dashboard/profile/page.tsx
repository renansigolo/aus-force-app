"use client"

import { useUserContext } from "@/app/UserContext"
import { BankForm } from "@/app/dashboard/profile/BankForm"
import { PersonalDocumentsForm } from "@/app/dashboard/profile/PersonalDocumentsForm"
import { ProfileForm } from "@/app/dashboard/profile/ProfileForm"
import { Divider } from "@/components/Divider"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"

export type UserRoles = "worker" | "client" | "business" | "admin"
export type DatabaseUser = {
  displayName: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  photoURL: string
  uid: string
  dob: string
  role: UserRoles
  signatureURL: string
  accountName: string
  accountNumber: number
  bsb: number
  bankName: string
  driverLicense: string
  driverLicenseIssued: string
  driverLicenseExpiry: string
  driverLicenseURL: string
  passportNumber: string
  passportIssued: string
  passportExpiry: string
  passportURL: string
  identificationNumber: string
  identificationIssued: string
  identificationExpiry: string
  identificationURL: string
}

export default function ProfilePage() {
  const styleSection = "grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"

  // Get the user's data using the Firebase SDK in firestore
  const { user } = useUserContext()
  const data = user as DatabaseUser

  return (
    <PageWrapper>
      <PageHeading title="Account Details" />
      <section className={styleSection}>
        <Heading
          title="Personal Information"
          description="Your personal information is used to identify you and your business"
        />
        <ProfileForm user={data} />
      </section>

      <Divider />

      <section className={styleSection}>
        <Heading title="Bank Details" description="Your bank details" />
        <BankForm user={data} />
      </section>

      <Divider />

      <section className={styleSection}>
        <Heading title="Personal Documents" description="Personal documents" />
        <PersonalDocumentsForm user={data} />
      </section>
    </PageWrapper>
  )
}

type HeadingProps = {
  title: string
  description: string
}
function Heading({ title, description }: HeadingProps) {
  return (
    <div>
      <h2 className="text-base font-semibold leading-7">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p>
    </div>
  )
}
