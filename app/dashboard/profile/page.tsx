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
      <SectionHeading title="Account Details" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <form className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full flex items-center gap-x-8">
              <img
                src="/images/profile-placeholder.png"
                alt="Profile image"
                className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
              />
              <div>
                <button type="button" className="btn btn-primary">
                  Change avatar
                </button>
                <p className="mt-2 text-xs leading-5 text-gray-500">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input type="text" name="first-name" id="first-name" autoComplete="given-name" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input type="text" name="last-name" id="last-name" autoComplete="family-name" />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input id="email" name="email" type="email" autoComplete="email" />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="timezone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Timezone
              </label>
              <div className="mt-2">
                <select id="timezone" name="timezone">
                  <option>Pacific Standard Time</option>
                  <option>Eastern Standard Time</option>
                  <option>Greenwich Mean Time</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Change password</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Update your password associated with your account.
          </p>
        </div>

        <form className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="current-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current password
              </label>
              <div className="mt-2">
                <input
                  id="current-password"
                  name="current_password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New password
              </label>
              <div className="mt-2">
                <input
                  id="new-password"
                  name="new_password"
                  type="password"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="px-4 sm:px-6 md:px-0">
        <section className="mt-10 divide-y divide-gray-200">
          <div className="space-y-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
            <p className="max-w-2xl text-sm text-gray-500">Your personal details</p>
          </div>
          <div className="mt-6">
            <dl className="divide-y divide-gray-200">
              {personalDetails.map((item) => (
                <FormRow {...item} key={item.title} />
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-10 divide-y divide-gray-200">
          <div className="space-y-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Bank Details</h3>
            <p className="max-w-2xl text-sm text-gray-500">Your bank details.</p>
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">Additional Documents</h3>
            <p className="max-w-2xl text-sm text-gray-500">Some additional documents.</p>
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
