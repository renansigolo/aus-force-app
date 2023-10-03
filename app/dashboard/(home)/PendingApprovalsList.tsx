"use client"

import { Accordion, AccordionProps } from "@/components/Accordion"
import { Button } from "@/components/Button"
import toast from "react-hot-toast"

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
    startTime: "8:00am",
    endTime: "3:30pm",
    break: "30",
    normalHours: "30",
    overtimeHours: "0.5",
  },
  {
    name: "Vini",
    jobSite: "ACR 1",
    startTime: "9:00am",
    endTime: "3:30pm",
    break: "30",
    normalHours: "30",
    overtimeHours: "0.5",
  },
]

type PendingApprovalsListProps = {
  items: AccordionProps["items"]
}
export function PendingApprovalsList({ items }: PendingApprovalsListProps) {
  return <Accordion items={items} />
}

export function ShiftTable() {
  const approveShift = () => toast.success("Shift approved!")

  return (
    <div className="px-4 sm:px-0">
      <div className="-mx-4 mt-4 sm:-mx-0">
        <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="bg-gray-50 text-sm font-semibold text-gray-900">
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left sm:hidden">
                  Shift Details
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left sm:table-cell">
                  Worker Name
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left lg:table-cell">
                  Job Site
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left sm:table-cell">
                  Start Time
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left sm:table-cell">
                  End Time
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left sm:table-cell">
                  Break
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left sm:table-cell">
                  Normal Hours
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left sm:table-cell">
                  Overtime Hours
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {person.map((person) => (
                <tr key={person.name}>
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
                    <Button className="btn-secondary" href={"?showModal=true"}>
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
