"use client"

import { Empty } from "@/components/Empty"
import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import NiceModal from "@ebay/nice-modal-react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, ChevronRightIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { CloudArrowDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline"
import { Fragment } from "react"
import { twMerge } from "tailwind-merge"

const accordionItems = [{ title: "Job Site A" }, { title: "Job Site B" }, { title: "Job Site C" }]

export default function TimesheetsPage() {
  const showModal = () =>
    NiceModal.show(Modal, {
      title: "Timesheet Settings",
      children: <TimesheetModal />,
    })

  return (
    <SectionWrapper>
      <Role role="business">
        <SectionHeading title="Timesheets" />
        <section className="py-8">
          {accordionItems.length > 0 ? (
            <Client showModal={showModal} />
          ) : (
            <Empty title="timesheets" />
          )}
        </section>
      </Role>
    </SectionWrapper>
  )
}

function Client({ showModal }: { showModal: any }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      {/* Heading */}
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Client 01</h3>
            <p className="mt-1 truncate text-sm text-gray-500">Cycle starts on Monday</p>
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
                          onClick={() => showModal()}
                          className={twMerge(
                            active ? "bg-gray-100" : "",
                            "block w-full px-4 py-2 text-left text-sm text-gray-700",
                          )}
                        >
                          Configure Cycle
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
                      <TimesheetsList />
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

function TimesheetsList() {
  return (
    <div className="mb-2 rounded-md border border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-12 w-12" />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Week 34</h3>
              <p className="text-sm text-gray-500">14/08/2023 - 14/08/2023</p>
            </div>
          </div>
        </div>
        <div className="ml-4 mt-4 flex flex-shrink-0">
          <button
            type="button"
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <CloudArrowDownIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function TimesheetModal() {
  return (
    <form className="my-12 space-y-8 divide-y divide-gray-200">
      <div className="mt-6 grid gap-4">
        <div className="col-span-1">
          <label htmlFor="startDay" className="block text-sm font-medium text-gray-700">
            Starting Day
          </label>
          <div className="mt-1">
            <select id="startDay" name="startDay">
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  )
}
