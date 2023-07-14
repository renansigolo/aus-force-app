"use client"

import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import NiceModal from "@ebay/nice-modal-react"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, ChevronRightIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid"

const accordionItems = [{ title: "Client 1" }, { title: "Client 2" }, { title: "Client 3" }]
const tableItems = [
  {
    status: "paid",
    name: "Fabi",
    position: "Labour",
    amount: "300",
    timesheet: "https://www.google.com",
    bankDetails: {
      bsb: "123456",
      accountNumber: "123456789",
    },
  },
  {
    status: "notPaid",
    position: "Forklift Driver",
    name: "Renan",
    amount: "600",
    timesheet: "https://www.google.com",
    bankDetails: {
      bsb: "123456",
      accountNumber: "123456789",
    },
  },
  {
    name: "Vini",
    position: "Boss",
    amount: "200",
    timesheet: "https://www.google.com",
    bankDetails: {
      bsb: "123456",
      accountNumber: "123456789",
    },
  },
]

export default function PayrollPage() {
  const showModal = () =>
    NiceModal.show(Modal, {
      title: "New Client",
      children: <AddNewClientModal />,
    })

  return (
    <SectionWrapper>
      <Role role="business">
        <SectionHeading title="Payroll" />
        <section className="py-8">
          <p className="mb-2 text-lg font-semibold text-gray-900">Overdue payments</p>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            {/* Heading */}
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-2">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Payment 13/07/2023
                  </h3>
                </div>

                <div className="ml-4 mt-2 flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-5 sm:p-6">
              <Accordion />
            </div>
          </div>
        </section>

        <section className="py-8">
          <p className="mb-2 text-lg font-semibold text-gray-900">Upcoming payments</p>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            {/* Heading */}
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-2">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Payment 14/07/2023
                  </h3>
                </div>

                <div className="ml-4 mt-2 flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-5 sm:p-6">
              <Accordion />
            </div>
          </div>
        </section>

        {/* Previously Payments */}
        <section className="py-8">
          <p className="mb-2 text-lg font-semibold text-gray-900">Previously payments</p>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            {/* Heading */}
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-2">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Payment 12/07/2023
                  </h3>
                </div>

                <div className="ml-4 mt-2 flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-5 sm:p-6">
              <Accordion />
            </div>
          </div>
        </section>
      </Role>
    </SectionWrapper>
  )
}

function Accordion({ approveShift, showModal }: any) {
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="mx-auto px-2 pb-6">
        <div className="mx-auto divide-gray-900/10">
          <dl className="space-y-6 divide-y divide-gray-900/10">
            {accordionItems.map((item) => (
              <Disclosure key={item.title} as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-center justify-between text-left text-gray-900">
                        <span className="flex h-7 items-center">
                          {open ? (
                            <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                          <span className="ml-2 text-base font-semibold leading-7">
                            {item.title}
                          </span>
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 px-2">
                      <ShiftTable approveShift={approveShift} showModal={showModal} />
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

function ShiftTable({ approveShift, showModal }: any) {
  return (
    <div className="px-4 sm:px-0">
      <div className="-mx-4 mt-4 sm:-mx-0">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:hidden"
                >
                  Table 1
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                ></th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Position
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Timesheet
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Bank Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tableItems.map((tableItem) => (
                <tr key={tableItem.name}>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    <input
                      id="paid"
                      aria-describedby="paid-toggle"
                      name="paid"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </td>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                    {tableItem.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Name</dt>
                      <dd className="mt-1 truncate text-gray-700">{tableItem.position}</dd>
                      <dt className="sr-only sm:hidden">Position</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        Amount {tableItem.amount}
                      </dd>
                    </dl>
                  </td>

                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {tableItem.position}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {tableItem.amount}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {tableItem.timesheet}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    BSB: {tableItem.bankDetails.bsb}
                    <br />
                    Account Number: {tableItem.bankDetails.accountNumber}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AddNewClientModal() {
  return (
    <>
      <form className="my-12 space-y-8 divide-y divide-gray-200">
        <div className="mt-6 grid gap-4">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <div className="mt-1">
              <input type="text" name="clientName" id="clientName" />
            </div>
          </div>

          <div>
            <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input type="email" name="clientEmail" id="clientEmail" />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
