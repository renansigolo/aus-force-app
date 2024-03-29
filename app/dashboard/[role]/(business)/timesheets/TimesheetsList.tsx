"use client"

import { Accordion } from "@/components/Accordion"
import { Card, CardContent, CardHeader } from "@/components/Card"
import { Empty } from "@/components/Empty"
import { Menu, Transition } from "@headlessui/react"
import {
  CloudArrowDownIcon,
  DocumentTextIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { Fragment } from "react"
import { twMerge } from "tailwind-merge"

const accordionItems = [
  { title: "Job Site A", children: <TimesheetsAccordionItem /> },
  { title: "Job Site B", children: <TimesheetsAccordionItem /> },
  { title: "Job Site C", children: <TimesheetsAccordionItem /> },
]

type Timesheet = { id: string }
const timesheets: Timesheet[] = []

export function TimesheetsList() {
  return (
    <div className="grid gap-2">
      {timesheets.length === 0 ? (
        <Empty title="timesheets" />
      ) : (
        timesheets.map((timesheet) => (
          <div key={timesheet.id}>
            <Client id={timesheet.id} />
          </div>
        ))
      )}
    </div>
  )
}

function Client({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Client {id}</h3>
          <p className="mt-1 truncate text-sm text-gray-500">Cycle starts on Monday</p>
        </div>

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
                    href="?showModal=true"
                    className={twMerge(
                      active ? "bg-gray-100" : "",
                      "block w-full px-4 py-2 text-left text-sm text-gray-700",
                    )}
                  >
                    Edit cycle
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </CardHeader>

      <CardContent>
        <Accordion items={accordionItems} />
      </CardContent>
    </Card>
  )
}

function TimesheetsAccordionItem() {
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
