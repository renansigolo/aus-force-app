import { DatabaseUser } from "@/app/dashboard/profile/page"
import { Empty } from "@/components/Empty"
import { UserCircleIcon } from "@heroicons/react/20/solid"
import { Fragment } from "react"
import { twMerge } from "tailwind-merge"

type Worker = {
  id: string
  name: string
  email: string
  href: string
  rate: string
  phone: string
  status: "allocated" | "non-allocated"
  startDate: string
  hoursWorked: string
  dob: string
  age: string
  qualifications: string[]
}

// const workers: Worker[] = [
//   {
//     id: "1",
//     name: "Renan Sigolo",
//     email: "renan.sigolo@gmail.com",
//     href: "#",
//     rate: "$20,000",
//     phone: "0434 385 978",
//     status: "allocated",
//     startDate: "July 12, 2021",
//     hoursWorked: "32h",
//     dob: "15/10/1991",
//     age: "31y",
//     qualifications: ["RSA", "RSG", "First Aid", "White Card"],
//   },
//   {
//     id: "2",
//     name: "Vini",
//     email: "vini@hotmail.com",
//     href: "#",
//     rate: "$20,000",
//     phone: "0434 123 456",
//     status: "allocated",
//     startDate: "July 11, 2021",
//     hoursWorked: "64h",
//     dob: "10/07/1992",
//     age: "29y",
//     qualifications: ["RSA", "RSG", "First Aid", "White Card"],
//   },
//   {
//     id: "3",
//     name: "Fabi",
//     email: "fabi@gmail.com",
//     href: "#",
//     phone: "0434 789 456",
//     rate: "$20,000",
//     status: "non-allocated",
//     startDate: "July 11, 2021",
//     hoursWorked: "386h",
//     dob: "12/10/1995",
//     age: "27y",
//     qualifications: ["RSA", "RSG", "First Aid", "White Card"],
//   },
// ]
const workers: Worker[] = [
  {
    id: "1",
    name: "Renan Sigolo",
    email: "renan.sigolo@gmail.com",
    href: "#",
    rate: "$20,000",
    phone: "0434 385 978",
    status: "allocated",
    startDate: "July 12, 2021",
    hoursWorked: "32h",
    dob: "15/10/1991",
    age: "31y",
    qualifications: ["RSA", "RSG", "First Aid", "White Card"],
  },
]

const statusStyles: { [key in string]: string } = {
  active: "bg-green-100 text-green-800",
  holidays: "bg-yellow-100 text-yellow-800",
  fired: "bg-red-100 text-red-800",
}

type WorkersListProps = {
  workers: DatabaseUser[]
}

export function WorkersList({ workers }: WorkersListProps) {
  // filter workers by status
  const allocatedWorkers = workers.filter((worker) => worker.status === "allocated")
  const unallocatedWorkers = workers.filter((worker) => worker.status === "unallocated")

  return (
    <div className="flex flex-col gap-4">
      {workers.length === 0 ? (
        <Empty title="worker" />
      ) : (
        workers.map((item) => (
          <Fragment key={item.uid}>
            {item.status === "allocated" && (
              <WorkersTable status="Allocated Workers" workers={allocatedWorkers} />
            )}
            {item.status === "unallocated" && (
              <WorkersTable status="Non Allocated Workers" workers={unallocatedWorkers} />
            )}
          </Fragment>
        ))
      )}
    </div>
  )
}

type WorkersTableProps = {
  status: string
  workers: DatabaseUser[]
}
function WorkersTable({ status, workers }: WorkersTableProps) {
  return (
    <div>
      <h2 className="heading-3">{status}</h2>

      {/* Activity list (smallest breakpoint only) */}
      <div className="rounded-lg shadow sm:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 overflow-hidden rounded-lg shadow sm:hidden"
        >
          {workers.map((item) => (
            <li key={item.uid}>
              <span className="block bg-white px-4 py-4">
                <span className="flex items-center space-x-4">
                  <span className="flex flex-1 space-x-2 truncate">
                    <UserCircleIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="flex flex-col truncate text-sm text-gray-500">
                      <span className="truncate">{item.displayName}</span>
                      <span>{item.dob}</span>
                      {/* <span>{item.age}</span> */}
                      <span>{item.email}</span>
                      <span>{item.phoneNumber}</span>
                      {/* <span>
                        <span className="font-medium text-gray-900">{item.rate}</span>{" "}
                      </span>
                      <time dateTime={item.hoursWorked}>{item.startDate}</time>
                      <span>Worked: {item.hoursWorked}</span> */}
                    </span>
                  </span>
                  {/* <span className="inline-flex flex-col items-center px-2.5 py-0.5 text-xs font-medium capitalize">
                    {item.qualifications.map((qualification, index) => (
                      <p key={index}>{qualification}</p>
                    ))}
                  </span> */}
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

      {/* Activity table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="mt-2 flex flex-col">
          <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50 text-sm font-semibold text-gray-900">
                  <th className="px-6 py-3 text-left" scope="col">
                    Name
                  </th>
                  <th className="px-6 py-3 text-right" scope="col">
                    DOB
                  </th>
                  {/* <th className="px-6 py-3 text-right" scope="col">
                    Age
                  </th> */}
                  <th className="px-6 py-3 text-right" scope="col">
                    Email
                  </th>
                  <th className="px-6 py-3 text-right" scope="col">
                    Phone
                  </th>
                  {/* <th className="px-6 py-3 text-right" scope="col">
                    Rate
                  </th>
                  <th className="px-6 py-3 text-right" scope="col">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-right" scope="col">
                    Hours Worked
                  </th>
                  <th className="px-6 py-3 text-right" scope="col">
                    Qualifications
                  </th> */}
                  <th className="px-6 py-3 text-right" scope="col">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {workers.map((item) => (
                  <tr key={item.uid} className="bg-white">
                    <td className="w-full whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      <div className="flex gap-1">
                        <UserCircleIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <p className="text-gray-500 group-hover:text-gray-900">
                          {item.displayName}
                        </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{item.dob}</span>
                    </td>
                    {/* <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{item.age}</span>
                    </td> */}
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{item.email}</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{item.phoneNumber}</span>
                    </td>
                    {/* <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{item.rate}</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                      <time dateTime={item.hoursWorked}>{item.startDate}</time>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                      <time dateTime={item.hoursWorked}>{item.hoursWorked}</time>
                    </td> */}
                    {/* <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                      <span className="inline-flex flex-col items-center px-2.5 py-0.5 text-xs font-medium capitalize">
                        {item.qualifications.map((qualification, index) => (
                          <p key={index}>{qualification}</p>
                        ))}
                      </span>
                    </td> */}
                    <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                      <span
                        className={twMerge(
                          statusStyles[item.status],
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                        )}
                      >
                        {item.status}
                      </span>
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
