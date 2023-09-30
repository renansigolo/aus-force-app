"use client"

import { Accordion } from "@/components/Accordion"
import { Card, CardContent, CardHeader } from "@/components/Card"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"

const accordionItems = [
  { title: "Client 1", children: <ClientTable /> },
  { title: "Client 2", children: <ClientTable /> },
  { title: "Client 3", children: <ClientTable /> },
]

const tableItems = [
  {
    status: "paid",
    name: "Fabi",
    position: "Labour",
    amount: "300",
    timesheet: "https://www.google.com",
    bankDetails: {
      bsb: "123456",
      accountNumber: "123456789",
    },
  },
  {
    status: "notPaid",
    position: "Forklift Driver",
    name: "Renan",
    amount: "600",
    timesheet: "https://www.google.com",
    bankDetails: {
      bsb: "123456",
      accountNumber: "123456789",
    },
  },
  {
    name: "Vini",
    position: "Boss",
    amount: "200",
    timesheet: "https://www.google.com",
    bankDetails: {
      bsb: "123456",
      accountNumber: "123456789",
    },
  },
]

export default function PayrollPage() {
  return (
    <PageWrapper>
      <Role role="business">
        <PageHeading title="Payroll" />
        <section className="py-8">
          <p className="mb-2 text-lg font-semibold text-gray-900">Overdue payments</p>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Payment 13/07/2023</h3>
            </CardHeader>

            <CardContent>
              <Accordion items={accordionItems} />
            </CardContent>
          </Card>
        </section>

        <section className="py-8">
          <p className="mb-2 text-lg font-semibold text-gray-900">Upcoming payments</p>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Payment 14/07/2023</h3>
            </CardHeader>

            <CardContent>
              <Accordion items={accordionItems} />
            </CardContent>
          </Card>
        </section>

        {/* Previously Payments */}
        <section className="py-8">
          <p className="mb-2 text-lg font-semibold text-gray-900">Previously payments</p>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Payment 12/07/2023</h3>
            </CardHeader>

            <CardContent>
              <Accordion items={accordionItems} />
            </CardContent>
          </Card>
        </section>
      </Role>
    </PageWrapper>
  )
}

function ClientTable() {
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
                  Table 1
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  <input
                    id="selectAll"
                    aria-describedby="select-all-checkbox"
                    name="selectAll"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Position
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Timesheet
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Bank Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tableItems.map((tableItem) => (
                <tr key={tableItem.name}>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    <input
                      id="paid"
                      aria-describedby="paid-toggle"
                      name="paid"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </td>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                    {tableItem.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Name</dt>
                      <dd className="mt-1 truncate text-gray-700">{tableItem.position}</dd>
                      <dt className="sr-only sm:hidden">Position</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        Amount {tableItem.amount}
                      </dd>
                    </dl>
                  </td>

                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {tableItem.position}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {tableItem.amount}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {tableItem.timesheet}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    BSB: {tableItem.bankDetails.bsb}
                    <br />
                    Account Number: {tableItem.bankDetails.accountNumber}
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
