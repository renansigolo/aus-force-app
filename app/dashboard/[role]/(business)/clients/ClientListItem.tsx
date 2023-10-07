"use client"

import { ClientData } from "@/app/dashboard/[role]/(business)/clients/ClientsList"
import { Accordion, AccordionItem } from "@/components/Accordion"
import { Button } from "@/components/Button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card"
import { Empty } from "@/components/Empty"
import { deleteDocument } from "@/lib/firebase"
import { Popover } from "@headlessui/react"
import { TrashIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const tableData = [
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

type ClientListItemProps = {
  data: ClientData
}

export function ClientListItem({ data }: ClientListItemProps) {
  const accordionItems: AccordionItem[] = [
    // { title: "JOB_SITE_TITLE_HERE", children: <ClientAccordionContent /> },
    // { title: "JOB_SITE_TITLE_HERE", children: <ClientAccordionContent /> },
    // { title: "JOB_SITE_TITLE_HERE", children: <ClientAccordionContent /> },
  ]

  const router = useRouter()
  const deleteLeaveRequest = async (id: string) => {
    await deleteDocument("clients", id)
    router.refresh()
    toast.success("Client deleted")
  }

  return (
    <Card>
      <CardHeader className="flex">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">{data.name}</h3>
          <span className="text-xs font-medium text-gray-400">{data.email}</span>
        </div>
        {/* TODO: Refactor Popover to receive all items options */}
        <Popover />
      </CardHeader>

      <CardContent>
        {accordionItems.length === 0 ? (
          <Empty title="job site for this client" />
        ) : (
          <Accordion items={accordionItems} />
        )}
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          className="btn-secondary hover:text-red-500"
          onClick={() => deleteLeaveRequest(data.id)}
        >
          <TrashIcon className="h-5 w-5" /> Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

function ClientAccordionContent() {
  return (
    <>
      {/* Ongoing Table */}
      <ShiftsTable title="Ongoing" />

      {/* Casual Table */}
      <ShiftsTable title="Casual" />
    </>
  )
}

function ShiftsTable({ title }: { title: string }) {
  return (
    <div className="-mx-4 mt-4 sm:-mx-0">
      <p className="mb-2 text-lg font-semibold text-gray-900">{title}</p>
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
            {tableData.map((tableItem) => (
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
  )
}
