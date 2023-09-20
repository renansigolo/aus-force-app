"use client"

import { AdditionalDocumentsForm } from "@/app/dashboard/profile/AdditionalDocumentsForm"
import { BankForm } from "@/app/dashboard/profile/BankForm"
import { ProfileForm } from "@/app/dashboard/profile/ProfileForm"
import { Divider } from "@/components/Divider"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export default async function ProfilePage() {
  // Get the user's data using the Firebase SDK in firestore
  const docRef = doc(db, `users/${auth.currentUser?.uid}`)
  const docSnap = await getDoc(docRef)
  const data = docSnap.data()

  return (
    <SectionWrapper>
      <SectionHeading title="Account Details" />
      <section className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Your personal information is used to identify you and your business
          </p>
        </div>

        <ProfileForm {...data} />
      </section>

      <Divider />

      <section className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7">Bank Details</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">Your bank details</p>
        </div>

        <BankForm />
      </section>

      <Divider />

      <section className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7">Additional Documents</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">Some additional documents</p>
        </div>
        <AdditionalDocumentsForm {...data} />
      </section>
    </SectionWrapper>
  )
}
