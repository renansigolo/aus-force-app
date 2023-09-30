import { Empty } from "@/components/Empty"
import { Role } from "@/components/Roles"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { BanknotesIcon } from "@heroicons/react/20/solid"
import { BuildingOffice2Icon } from "@heroicons/react/24/outline"
import { twMerge } from "tailwind-merge"

// const data = [
//   {
//     id: 1,
//     name: "Shift #123",
//     href: "#",
//     amount: "$20,000",
//     currency: "AUD",
//     status: "approved",
//     date: "July 12, 2021",
//     datetime: "2020-07-11",
//   },
//   {
//     id: 2,
//     name: "Shift #456",
//     href: "#",
//     amount: "$20,000",
//     currency: "AUD",
//     status: "pending",
//     date: "July 11, 2021",
//     datetime: "2020-07-11",
//   },
//   {
//     id: 3,
//     name: "Shift #789",
//     href: "#",
//     amount: "$20,000",
//     currency: "AUD",
//     status: "declined",
//     date: "July 11, 2021",
//     datetime: "2020-07-11",
//   },
// ]
type Status = "approved" | "pending" | "declined"
type Shift = {
  id: number
  name: string
  href: string
  amount: string
  currency: string
  status: Status
  date: string
  datetime: string
}
const data: Shift[] = []

type StatusStyles = {
  [key in Status]: string
}
const statusStyles: StatusStyles = {
  approved: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  declined: "bg-red-100 text-red-800",
}

export default function ShiftsPage() {
  return (
    <PageWrapper>
      <SectionHeading title="Shifts" />
      <section className="py-8">
        {data.length > 0 ? <ShiftsList /> : <Empty title="shifts" />}
      </section>
    </PageWrapper>
  )
}

function ShiftsList() {
  return (
    <Role role="worker">
      <div className="pb-6">
        <h2 className="heading-3 pl-4">Week 32</h2>
        {/* Activity list (smallest breakpoint only) */}
        <div className="rounded-lg shadow sm:hidden">
          <ul
            role="list"
            className="mt-2 divide-y divide-gray-200 overflow-hidden rounded-lg shadow sm:hidden"
          >
            {data.map((transaction) => (
              <li key={transaction.id}>
                <span className="block bg-white px-4 py-4">
                  <span className="flex items-center space-x-4">
                    <span className="flex flex-1 space-x-2 truncate">
                      <BanknotesIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="flex flex-col truncate text-sm text-gray-500">
                        <span className="truncate">{transaction.name}</span>
                        <span>
                          {transaction.currency}
                          <span className="font-medium text-gray-900">
                            {transaction.amount}
                          </span>{" "}
                        </span>
                        <time dateTime={transaction.datetime}>{transaction.date}</time>
                      </span>
                    </span>
                    <span
                      className={twMerge(
                        statusStyles[transaction.status],
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                      )}
                    >
                      {transaction.status}
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
                    <th className="table-header text-left" scope="col">
                      Shifts
                    </th>
                    <th className="table-header text-right" scope="col">
                      Amount
                    </th>
                    <th className="table-header hidden text-left md:block" scope="col">
                      Status
                    </th>
                    <th className="table-header text-right" scope="col">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((transaction) => (
                    <tr key={transaction.id} className="bg-white">
                      <td className="table-data w-full max-w-0 text-sm text-gray-900">
                        <div className="flex">
                          <span className="group inline-flex space-x-2 truncate text-sm">
                            <BuildingOffice2Icon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <p className="truncate text-gray-500">{transaction.name}</p>
                          </span>
                        </div>
                      </td>
                      <td className="table-data text-right text-sm text-gray-500">
                        {transaction.currency}
                        <span className="font-medium text-gray-900">{transaction.amount}</span>
                      </td>
                      <td className="table-data hidden text-sm text-gray-500 md:block">
                        <span
                          className={twMerge(
                            statusStyles[transaction.status],
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                          )}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="table-data text-right text-sm text-gray-500">
                        <time dateTime={transaction.datetime}>{transaction.date}</time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Role>
  )
}
