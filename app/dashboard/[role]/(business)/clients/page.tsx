"use client"

import { ClientsForm } from "@/app/dashboard/[role]/(business)/clients/ClientsForm"
import { Card, CardContent, CardHeader } from "@/components/Card"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { SearchParams } from "@/lib/schemas"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, ChevronRightIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { Fragment } from "react"
import { twMerge } from "tailwind-merge"

const accordionData = [{ title: "Job Site A" }, { title: "Job Site B" }, { title: "Job Site C" }]
const data = [
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
type ClientsPageProps = { searchParams: SearchParams }

export default function ClientsPage({ searchParams }: ClientsPageProps) {
  const showModal = searchParams.showModal === "true"

  return (
    <PageWrapper>
      <Role role="business">
        <PageHeading title="Clients" buttonLabel="Add New Client" />

        <section className="py-8">
          {accordionData.length > 0 ? <Client /> : <Empty title="clients" />}
        </section>

        <ModalWrapper title="New Client" showModal={showModal}>
          <ClientsForm />
        </ModalWrapper>
      </Role>
    </PageWrapper>
  )
}

function Client() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Client 01</h3>
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
                  <Link
                    href="/dashboard/rates"
                    className={twMerge(
                      active ? "bg-gray-100" : "",
                      "block w-full px-4 py-2 text-left text-sm text-gray-700",
                    )}
                  >
                    Manage Rates
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="?showModal=true"
                    className={twMerge(
                      active ? "bg-gray-100" : "",
                      "block w-full px-4 py-2 text-left text-sm text-gray-700",
                    )}
                  >
                    Edit
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => console.log("Button Clicked")}
                    className={twMerge(
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
      </CardHeader>

      <CardContent>
        <Accordion />
      </CardContent>
    </Card>
  )
}

function Accordion({ approveShift, showModal }: any) {
  return (
    <div className="w-full rounded-lg bg-white shadow">
      <div className="mx-auto px-2 pb-6">
        <div className="mx-auto divide-gray-900/10">
          <dl className="space-y-6 divide-y divide-gray-900/10">
            {accordionData.map((item) => (
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
              {data.map((tableItem) => (
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
              {data.map((tableItem) => (
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
