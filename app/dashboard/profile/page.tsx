"use client"

import { useAuthContext } from "@/app/AuthContext"
import { AdditionalDocumentsForm } from "@/app/dashboard/profile/AdditionalDocumentsForm"
import { BankForm } from "@/app/dashboard/profile/BankForm"
import { ProfileForm } from "@/app/dashboard/profile/ProfileForm"
import { Divider } from "@/components/Divider"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export type CurrentUserProfile = {
  displayName: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  photoURL: string
  uid: string
  dob: string
  role: string
  signatureURL: string
  accountName: string
  accountNumber: number
  bsb: number
  bankName: string
  driverLicense: string
  passport: string
  whiteCard: string
}

export default async function ProfilePage() {
  // Get the user's data using the Firebase SDK in firestore
  const { user } = useAuthContext()

  const docRef = doc(db, `users/${user?.uid}`)
  const docSnap = await getDoc(docRef)
  const data = docSnap.data() as CurrentUserProfile

  const styleSection = "grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"

  return (
    <SectionWrapper>
      <SectionHeading title="Account Details" />
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
        <Heading title="Additional Documents" description="Some additional documents" />
        <AdditionalDocumentsForm user={data} />
      </section>
    </SectionWrapper>
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
