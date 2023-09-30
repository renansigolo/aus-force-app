"use client"

import { Accordion } from "@/components/Accordion"
import { Button } from "@/components/Button"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { CloudArrowDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const accordionItems = [
  { title: "Company ABC", children: <InvoicesList /> },
  { title: "Company XYZ", children: <InvoicesList /> },
  { title: "Company ABCDEF", children: <InvoicesList /> },
]

export default function InvoicesPage() {
  return (
    <PageWrapper>
      <Role role="business">
        <PageHeading title="Invoices" />
        <section className="py-8">
          <h2 className="heading-3 my-6">⏳ Pending</h2>
          <Accordion items={accordionItems} />
          <h2 className="heading-3 my-6">⚠️ Partially Paid</h2>
          <Accordion items={accordionItems} />
          <h2 className="heading-3 my-6">✅ Paid</h2>
          <Accordion items={accordionItems} />
        </section>
      </Role>
    </PageWrapper>
  )
}

function InvoicesList() {
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
