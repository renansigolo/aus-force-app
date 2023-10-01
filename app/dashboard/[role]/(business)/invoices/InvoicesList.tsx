"use client"

import { Accordion } from "@/components/Accordion"
import { Button } from "@/components/Button"
import { Card, CardContent, CardHeader } from "@/components/Card"
import { Empty } from "@/components/Empty"
import { CloudArrowDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const accordionItems = [
  { title: "Company ABC", children: <InvoiceItem /> },
  { title: "Company XYZ", children: <InvoiceItem /> },
  { title: "Company ABCDEF", children: <InvoiceItem /> },
]

const invoicesItems = [
  { status: "pending", invoices: [] },
  { status: "partial", invoices: [] },
  { status: "paid", invoices: [] },
]

export function InvoicesList() {
  return (
    <div className="grid gap-6">
      {invoicesItems.map((invoicesItem) => (
        <section key={invoicesItem.status}>
          <h3 className="mb-2 text-lg font-semibold capitalize text-gray-900">
            {invoicesItem.status}
          </h3>

          {invoicesItem.invoices.length > 0 ? (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Payment 12/07/2023</h3>
              </CardHeader>

              <CardContent>
                <Accordion items={accordionItems} />
              </CardContent>
            </Card>
          ) : (
            <Empty title={`${invoicesItem.status} invoices`} />
          )}
        </section>
      ))}
    </div>
  )
}

function InvoiceItem() {
  return (
    <div className="mb-2 rounded-md border border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-12 w-12" />
            </div>
            <div>
              <h3 className="text-base font-semibold leading-6 text-gray-900">INV-123</h3>
              <p className="text-sm text-gray-500">
                <Link href="#">
                  {/* Due on 29/10/2023 */}
                  Paid 29/10/2023
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-shrink-0">
            <Button type="button" className="btn-secondary">
              <CloudArrowDownIcon className="h-5 w-5" aria-hidden="true" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
