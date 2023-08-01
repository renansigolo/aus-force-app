"use client"

import { Empty } from "@/components/Empty"
import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { cn } from "@/lib/helpers"
import NiceModal from "@ebay/nice-modal-react"
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, ChevronRightIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Fragment, useRef, useState } from "react"

const accordionItems = [{ title: "Job Site A" }, { title: "Job Site B" }, { title: "Job Site C" }]
const tableItems = [
  {
    status: "ongoing",
    name: "Fabi",
    jobSite: "ACR 1",
    endDate: "24/07 - 3:30pm",
  },
  {
    status: "casual",
    name: "Renan",
    endDate: "24/07 - 3:30pm",
  },
  {
    name: "Vini",
    jobSite: "ACR 1",

    endDate: "24/07 - 3:30pm",
  },
]

export default function ClientsPage() {
  const showModal = () =>
    NiceModal.show(Modal, {
      title: "New Client",
      children: <AddNewClientModal />,
    })

  // const confirmationModal = () =>
  //   NiceModal.show(Modal, {
  //     title: "Delete Client",
  //     children: <ConfirmationModal />,
  //   });

  return (
    <SectionWrapper>
      <Role role="business">
        <SectionHeading title="Clients" buttonLabel="Add New Client" buttonAction={showModal} />
        <section className="py-8">
          <Empty title="clients" />
        </section>

        <section className="py-8">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            {/* Heading */}
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-2">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Client 01</h3>
                </div>

                <div className="ml-4 mt-2 flex-shrink-0">
                  <div className="lg:flex lg:items-center lg:justify-end">
                    <Menu as="div" className="relative flex-shrink-0">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open options</span>
                          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => console.log("Button Clicked")}
                                className={cn(
                                  active ? "bg-gray-100" : "",
                                  "block w-full px-4 py-2 text-left text-sm text-gray-700",
                                )}
                              >
                                Manage Rates
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => console.log("Button Clicked")}
                                className={cn(
                                  active ? "bg-gray-100" : "",
                                  "block w-full px-4 py-2 text-left text-sm text-gray-700",
                                )}
                              >
                                Delete
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
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
      {/* Ongoing Table */}
      <div className="-mx-4 mt-4 sm:-mx-0">
        <p className="mb-2 text-lg font-semibold text-gray-900">Ongoing</p>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:hidden"
                >
                  Ongoing
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Worker Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Job Site
                </th>

                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Start Date
                </th>

                <th scope="col" className="relative py-3.5 pl-3 pr-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tableItems.map((tableItem) => (
                <tr key={tableItem.name}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                    {tableItem.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Job Site</dt>
                      <dd className="mt-1 truncate text-gray-700">{tableItem.jobSite}</dd>
                      <dt className="sr-only sm:hidden">End Time</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        Start date: {tableItem.endDate}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {tableItem.jobSite}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {tableItem.endDate}
                  </td>

                  <td className="flex flex-col-reverse gap-2 py-4 pl-3 pr-4 text-right text-sm font-medium lg:flex-row">
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                      14 Days Worked
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Casual Table */}
      <div className="-mx-4 mt-4 sm:-mx-0">
        <p className="mb-2 text-lg font-semibold text-gray-900">Casual</p>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:hidden"
                >
                  Ongoing
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Worker Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Job Site
                </th>

                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  End Date
                </th>

                <th scope="col" className="relative py-3.5 pl-3 pr-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tableItems.map((tableItem) => (
                <tr key={tableItem.name}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                    {tableItem.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Job Site</dt>
                      <dd className="mt-1 truncate text-gray-700">{tableItem.jobSite}</dd>
                      <dt className="sr-only sm:hidden">End Time</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        End date: {tableItem.endDate}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {tableItem.jobSite}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {tableItem.endDate}
                  </td>

                  <td className="flex flex-col-reverse gap-2 py-4 pl-3 pr-4 text-right text-sm font-medium lg:flex-row">
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                      14 Days Left
                    </span>
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

function ConfirmationModal() {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Deactivate account
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be
                        permanently removed from our servers forever. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    ref={cancelButtonRef}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
