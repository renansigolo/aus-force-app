import { Divider } from "@/app/(enter)/sign-up/Divider"
import { AdditionalDocumentsForm } from "@/app/dashboard/profile/AdditionalDocumentsForm"
import { BankForm } from "@/app/dashboard/profile/BankForm"
import { ProfileForm } from "@/app/dashboard/profile/ProfileForm"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { auth, db } from "@/lib/firebase"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
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
        <AdditionalDocumentsForm />
      </section>

      {/* <section className="mt-10 divide-y divide-gray-200">
          <div className="space-y-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Business Details
            </h3>
            <p className="max-w-2xl text-sm text-gray-500">
              Manage how information is displayed on your account.
            </p>
          </div>
          <div className="mt-6">
            <dl className="divide-y divide-gray-200">
              {businessDetails.map((item) => (
                <FormRow {...item} key={item.title} />
              ))}
            </dl>
          </div>
        </section> */}
    </SectionWrapper>
  )
}

type FormRowProps = {
  title: string
  value: string
}
function FormRow({ title, value }: FormRowProps) {
  return (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <span className="flex-grow">{value}</span>
        <span className="ml-4 flex-shrink-0">
          <button type="button">
            <PencilSquareIcon className="h-5 w-5 text-indigo-600 hover:text-indigo-500" />
          </button>
        </span>
      </dd>
    </div>
  )
}
