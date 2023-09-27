"use client"

import { RequestLeaveData } from "@/app/dashboard/request-leave/page"
import { deleteDocument } from "@/lib/firebase"
import { PencilIcon, SunIcon, TrashIcon } from "@heroicons/react/20/solid"
import { CalendarDaysIcon, CalendarIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { twMerge } from "tailwind-merge"

const statusStyles: any = {
  approved: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  declined: "bg-red-100 text-red-800",
}

type RequestLeaveListProps = {
  data: RequestLeaveData[]
}

export function RequestLeaveList({ data }: RequestLeaveListProps) {
  const router = useRouter()
  const deleteRequestLeave = async (id: string) => {
    await deleteDocument("requestLeave", id)
    router.refresh()
    toast.success("Leave request deleted")
  }

  return (
    <div className="pb-6">
      <h2 className="heading-3 pl-4">Latest activity</h2>

      {/* Activity list (smallest breakpoint only) */}
      <div className="rounded-lg shadow lg:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 overflow-hidden rounded-lg shadow lg:hidden"
        >
          {data.map((item) => (
            <li key={item.id}>
              <span className="block bg-white px-4 py-4">
                <span className="flex items-center justify-between space-x-4">
                  <span className="flex space-x-2">
                    <SunIcon
                      className="h-5 w-5 flex-shrink-0 font-medium text-gray-900"
                      aria-hidden="true"
                    />

                    <span className="flex flex-col text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{item.reason}</span>
                      <span className="inline-flex flex-wrap">{item.additionalNotes}</span>
                      <time dateTime={item.startDate} className="mt-2 flex items-center gap-1">
                        <CalendarIcon className="inline-flex h-5 w-5 flex-shrink-0 items-center font-medium text-gray-900" />
                        {item.startDate}
                      </time>
                      <time dateTime={item.endDate} className="flex items-center gap-1">
                        <CalendarDaysIcon className="inline-flex h-5 w-5 flex-shrink-0 font-medium text-gray-900" />
                        {item.endDate}
                      </time>
                    </span>
                  </span>

                  <span
                    className={twMerge(
                      statusStyles[item.status],
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                    )}
                  >
                    {item.status}
                  </span>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Activity table (large breakpoint and up) */}
      <div className="hidden lg:block">
        <div className="mt-2 flex flex-col">
          <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="table-header text-left" scope="col">
                    Reason
                  </th>
                  <th className="table-header text-right text-gray-900" scope="col">
                    Start Date
                  </th>
                  <th className="table-header text-right text-gray-900" scope="col">
                    End Date
                  </th>
                  <th className="table-header text-right" scope="col">
                    Status
                  </th>
                  <th className="table-header text-right" scope="col">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="w-full max-w-0 px-6 py-4">
                      <div className="flex flex-shrink-0">
                        <span className="group inline-flex flex-col space-x-2 text-sm">
                          <div className="inline-flex gap-1 font-medium text-gray-900">
                            <SunIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                            <span>{item.reason}</span>
                          </div>
                          <p className="text-gray-400">{item.additionalNotes}</p>
                        </span>
                      </div>
                    </td>
                    <td className="table-data text-right">
                      <time dateTime={item.startDate}>{item.startDate}</time>
                    </td>
                    <td className="table-data text-right">
                      <time dateTime={item.endDate}>{item.endDate}</time>
                    </td>
                    <td className="table-data text-right">
                      <span
                        className={twMerge(
                          statusStyles[item.status],
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="table-data mx-auto">
                      <div className="flex justify-between">
                        <PencilIcon
                          className="h-5 w-5 text-gray-400 hover:cursor-pointer hover:text-indigo-500"
                          aria-hidden="true"
                        />
                        <button type="button" onClick={() => deleteRequestLeave(item.id)}>
                          <TrashIcon
                            className="h-5 w-5 text-gray-400 hover:text-red-600"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
