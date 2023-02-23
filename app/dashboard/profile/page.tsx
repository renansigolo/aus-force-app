import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

const personalDetails = [
  {
    title: "Name",
    value: "Lindsay Watson",
  },
  {
    title: "Email",
    value: "lindsay.watson@example.com",
  },
  {
    title: "Phone",
    value: "0434 385 978",
  },
  {
    title: "Date of birthday",
    value: "15/10/1991",
  },
  {
    title: "Job title",
    value: "Compliance Manager",
  },
]

const businessDetails = [
  {
    title: "Trading Name",
    value: "Duke Marketing Inc.",
  },
  {
    title: "Legal Name",
    value: "Duke Marketing Pty Ltd",
  },
  {
    title: "ABN",
    value: "51 754 253 248",
  },
  {
    title: "ACN",
    value: "004 499 987",
  },
  {
    title: "Country",
    value: "Australia",
  },
  {
    title: "Street address",
    value: "333 George Street",
  },
  {
    title: "City",
    value: "Sydney",
  },
  {
    title: "State",
    value: "NSW",
  },
  {
    title: "ZIP / Postal Code",
    value: "2020",
  },
]

const bankDetails = [
  {
    title: "Bank",
    value: "Commonwealth Bank",
  },
  {
    title: "Account Name",
    value: "Lindsay Watson",
  },
  {
    title: "BSB",
    value: "123 456",
  },
  {
    title: "Account Number",
    value: "004 499 987",
  },
]

const additionalDocuments = [
  {
    title: "ID / Passport",
    value: "123456789",
  },
  {
    title: "White Card",
    value: "1321414",
  },
  {
    title: "Signature",
    value: "",
  },
]

export default function ProfilePage() {
  return (
    <SectionWrapper>
      <SectionHeading title="Account Details" buttonLabel="New Job" />
      <div className="px-4 sm:px-6 md:px-0">
        <section className="mt-10 divide-y divide-gray-200">
          <div className="space-y-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Profile
            </h3>
            <p className="max-w-2xl text-sm text-gray-500">
              Your personal details.
            </p>
          </div>
          <div className="mt-6">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                <dt className="text-sm font-medium text-gray-500">Photo</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                      alt="Profile Image"
                    />
                  </span>
                  <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                    <button type="button">
                      <PencilSquareIcon className="h-5 w-5 text-indigo-600 hover:text-indigo-500" />
                    </button>
                  </span>
                </dd>
              </div>

              {personalDetails.map((item) => (
                <FormRow {...item} key={item.title} />
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-10 divide-y divide-gray-200">
          <div className="space-y-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Bank Details
            </h3>
            <p className="max-w-2xl text-sm text-gray-500">
              Your bank details.
            </p>
          </div>
          <div className="mt-6">
            <dl className="divide-y divide-gray-200">
              {bankDetails.map((item) => (
                <FormRow {...item} key={item.title} />
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-10 divide-y divide-gray-200">
          <div className="space-y-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Additional Documents
            </h3>
            <p className="max-w-2xl text-sm text-gray-500">
              Some additional documents.
            </p>
          </div>
          <div className="mt-6">
            <dl className="divide-y divide-gray-200">
              {additionalDocuments.map((item) => (
                <FormRow {...item} key={item.title} />
              ))}
            </dl>
          </div>
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
      </div>
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
