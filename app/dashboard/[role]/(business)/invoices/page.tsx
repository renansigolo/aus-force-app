"use client"

import { Button } from "@/components/Button"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { Disclosure } from "@headlessui/react"

const accordionItems = [
  { title: "Company ABC" },
  { title: "Company XYZ" },
  { title: "Company ABCDEF" },
]

export default function InvoicesPage() {
  return (
    <PageWrapper>
      <Role role="business">
        <PageHeading title="Invoices" />
        <section className="py-8">
          <h2 className="heading-3 mx-2 my-6">⏳ Pending</h2>
          <Accordion />
          <h2 className="heading-3 mx-2 my-6">⚠️ Partially Paid</h2>
          <Accordion />
          <h2 className="heading-3 mx-2 my-6">✅ Paid</h2>
          <Accordion />
        </section>
      </Role>
    </PageWrapper>
  )
}

import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { CloudArrowDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

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

function Accordion() {
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="mx-auto px-2 pb-6">
        <div className="mx-auto divide-gray-900/10">
          <dl className="space-y-6 divide-y divide-gray-900/10">
            {accordionItems.map((item) => (
              <Disclosure key={item.title} as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-center justify-between text-left text-gray-900">
                        <span className="flex h-7 items-center">
                          {open ? (
                            <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                          <span className="ml-2 text-base font-semibold leading-7">
                            {item.title}
                          </span>
                        </span>

                        {/* <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
                          Paid
                        </span> */}
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 px-2 ">
                      <InvoicesList />
                      <InvoicesList />
                      <InvoicesList />
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
