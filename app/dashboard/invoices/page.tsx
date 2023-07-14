"use client"

import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Role } from "@/components/Roles"

export default function InvoicesPage() {
  return (
    <SectionWrapper>
      <Role role="business">
        <SectionHeading title="Invoices" />
        <section className="flex flex-col gap-2 py-8">
          <InvoicesList />
          <InvoicesList />
          <InvoicesList />
          <InvoicesList />
        </section>
      </Role>
    </SectionWrapper>
  )
}

import { EnvelopeIcon } from "@heroicons/react/20/solid"
import { CloudArrowDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline"

function InvoicesList() {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-12 w-12" />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">INV-123</h3>
              <p className="text-sm text-gray-500">
                <a href="#">ACN</a>
              </p>
            </div>
          </div>
        </div>
        <div className="ml-4 mt-4 flex flex-shrink-0">
          <button
            type="button"
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <CloudArrowDownIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Download</span>
          </button>
          <button
            type="button"
            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <EnvelopeIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <span>Email</span>
          </button>
        </div>
      </div>
    </div>
  )
}
