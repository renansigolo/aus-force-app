"use client"

import { Button } from "@/components/Button"
import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import NiceModal from "@ebay/nice-modal-react"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { toast } from "react-hot-toast"

const accordionItems = [
  { title: "Shift 02/06/23" },
  { title: "Shift 03/06/23" },
  { title: "Shift 04/06/23" },
]

const person = [
  {
    name: "Fabi",
    jobSite: "ACR 1",
    startTime: "7:00am",
    endTime: "3:30pm",
    break: "30",
    normalHours: "30",
    overtimeHours: "0.5",
  },
  {
    name: "Renan",
    jobSite: "ACR 1",
    startTime: "7:00am",
    endTime: "3:30pm",
    break: "30",
    normalHours: "30",
    overtimeHours: "0.5",
  },
  {
    name: "Vini",
    jobSite: "ACR 1",
    startTime: "7:00am",
    endTime: "3:30pm",
    break: "30",
    normalHours: "30",
    overtimeHours: "0.5",
  },
]

export function PendingApprovals() {
  const approveShift = () => toast.success("Shift approved!")
  const showModal = () =>
    NiceModal.show(Modal, {
      title: "Review Shift",
      description: "Please review the details and confirm your shift.",
      children: <ShiftApprovalModal />,
    })

  return (
    <Role role="client">
      <h2 className="heading-3 mb-3">Pending Approvals</h2>
      <Accordion approveShift={approveShift} showModal={showModal} />
    </Role>
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
                  Shift Details
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
                  Start Time
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  End Time
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Break
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Normal Hours
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Overtime Hours
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {person.map((person) => (
                <tr key={person.startTime}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                    {person.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Job Site</dt>
                      <dd className="mt-1 truncate text-gray-700">{person.jobSite}</dd>
                      <dt className="sr-only sm:hidden">Start Time</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        Start time: {person.startTime}
                      </dd>
                      <dt className="sr-only sm:hidden">End Time</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        End time: {person.endTime}
                      </dd>
                      <dt className="sr-only sm:hidden">Break</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        Break: {person.break}
                      </dd>
                      <dt className="sr-only sm:hidden">Normal Hours</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        Normal Hours: {person.normalHours}
                      </dd>
                      <dt className="sr-only sm:hidden">Overtime Hours</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        Overtime Hours: {person.overtimeHours}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {person.jobSite}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {person.startTime}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {person.endTime}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {person.break}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {person.normalHours}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {person.overtimeHours}
                  </td>
                  <td className="flex flex-col-reverse gap-2 py-4 pl-3 pr-4 text-right text-sm font-medium lg:flex-row">
                    <Button className="btn-secondary" onClick={showModal}>
                      Edit
                    </Button>
                    <Button onClick={approveShift}>Approve</Button>
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

                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          14 Approvals Pending
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

function ShiftApprovalModal() {
  return (
    <>
      <form className="my-12 space-y-8 divide-y divide-gray-200">
        <div className="mt-6 grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <label htmlFor="site-name" className="form-label">
              Company
            </label>
            <div className="mt-1">
              <input required id="site-name" name="site-name" type="text" />
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor="role" className="form-label">
              Job site
            </label>
            <div className="mt-1">
              <select id="role" name="role">
                <option>Site 01</option>
                <option>Site 02</option>
              </select>
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor="start-datetime" className="form-label">
              Start Time
            </label>
            <div className="mt-1">
              <input type="datetime-local" name="start-datetime" id="start-datetime" />
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor="end-datetime" className="form-label">
              End Time
            </label>
            <div className="mt-1">
              <input type="datetime-local" name="end-datetime" id="end-datetime" />
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor="role" className="form-label">
              Break (in minutes)
            </label>
            <input type="number" name="break" id="break" step="15" />
          </div>

          <div className="col-span-1">
            <label htmlFor="role" className="form-label">
              Normal Hours
            </label>
            <input type="number" name="normalHours" id="normalHours" step="0.5" />
          </div>

          <div className="col-span-1">
            <label htmlFor="role" className="form-label">
              Overtime Hours
            </label>
            <input type="number" name="overtimeHours" id="overtimeHours" step="0.5" />
          </div>

          <div className="col-span-1">
            <label htmlFor="additional-notes" className="form-label">
              Additional Notes
            </label>
            <div className="mt-1">
              <textarea id="additional-notes" name="additional-notes" />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
