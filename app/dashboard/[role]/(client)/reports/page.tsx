import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { UserIcon } from "@heroicons/react/20/solid"
import { FunnelIcon } from "@heroicons/react/24/outline"
import { twMerge } from "tailwind-merge"

const reports = [
  {
    id: 1,
    name: "Worker ABC",
    href: "#",
    amount: "$20,000",
    currency: "AUD",
    status: "87 hours",
    date: "July 12, 2021",
    datetime: "2020-07-11",
  },
  {
    id: 2,
    name: "Worker DEF",
    href: "#",
    amount: "20,000",
    currency: "AUD",
    status: "135 hours",
    date: "July 11, 2021",
    datetime: "2020-07-11",
  },
]

const statusStyles: any = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
}

export default function ReportsPage() {
  return (
    <PageWrapper>
      <Role role="client">
        <PageHeading title="Reports" buttonLabel="Download PDF" />

        {/* Filter */}
        <div className="mt-6">
          <div className="flex gap-2">
            <FunnelIcon className="h-6 w-6" />
            Filter your reports
          </div>
          <div className="col-span-1">
            <label htmlFor="job-site">Job Site</label>
            <select id="job-site" name="job-site">
              <option>All Sites</option>
              <option>Site 1</option>
              <option>Site 2</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <label htmlFor="startDate">Start Date</label>
              <input type="date" name="startDate" id="startDate" />
            </div>
            <div className="w-full">
              <label htmlFor="finishDate">Finish Date</label>
              <input type="date" name="finishDate" id="finishDate" />
            </div>
          </div>
        </div>

        <section className="py-8">
          <h2 className="heading-3 pl-4">Company ABC</h2>
          {/* Activity list (smallest breakpoint only) */}
          <div className="rounded-lg shadow sm:hidden">
            <ul
              role="list"
              className="mt-2 divide-y divide-gray-200 overflow-hidden rounded-lg shadow sm:hidden"
            >
              {reports.map((report) => (
                <li key={report.id}>
                  <span className="block bg-white px-4 py-4 hover:bg-gray-50">
                    <span className="flex items-center space-x-4">
                      <span className="flex flex-1 space-x-2 truncate">
                        <UserIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="flex flex-col truncate text-sm text-gray-500">
                          <span className="truncate">{report.name}</span>
                          <span>
                            <span className="font-medium text-gray-900">{report.amount}</span>{" "}
                            {report.currency}
                          </span>
                          <time dateTime={report.datetime}>{report.date}</time>
                        </span>
                      </span>
                      <span
                        className={twMerge(
                          statusStyles[report.status],
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                        )}
                      >
                        {report.status}
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Activity table (small breakpoint and up) */}
          <div className="hidden sm:block">
            <div className="mt-2 flex flex-col">
              <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        Transaction
                      </th>
                      <th
                        className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        Cost
                      </th>
                      <th
                        className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                        scope="col"
                      >
                        Hours
                      </th>
                      <th
                        className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        Start Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {reports.map((report) => (
                      <tr key={report.id} className="bg-white">
                        <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                          <div className="flex">
                            <a
                              href={report.href}
                              className="group inline-flex space-x-2 truncate text-sm"
                            >
                              <UserIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <p className="truncate text-gray-500 group-hover:text-gray-900">
                                {report.name}
                              </p>
                            </a>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <span className="font-medium text-gray-900">{report.amount}</span>
                          {report.currency}
                        </td>
                        <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                          <span
                            className={twMerge(
                              statusStyles[report.status],
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                            )}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <time dateTime={report.datetime}>{report.date}</time>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </Role>
    </PageWrapper>
  )
}
