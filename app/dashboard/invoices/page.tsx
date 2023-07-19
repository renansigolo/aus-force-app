"use client";

import { SectionHeading } from "@/components/dashboard/SectionHeading";
import { SectionWrapper } from "@/components/dashboard/SectionWrapper";
import { Role } from "@/components/Roles";
import { Disclosure } from "@headlessui/react";

const accordionItems = [
  {
    title: "Company ABC",
  },
  {
    title: "Company XYZ",
  },
  {
    title: "Company ABCDEF",
  },
];

export default function InvoicesPage() {
  return (
    <SectionWrapper>
      <Role role="business">
        <SectionHeading title="Invoices" />
        <section className="py-8">
          <h2 className="heading-3 mx-2 my-6 pl-4">⏳ Pending</h2>
          <Accordion />
          <h2 className="heading-3 mx-2 my-6 pl-4">⚠️ Partially Paid</h2>
          <Accordion />
          <h2 className="heading-3 mx-2 my-6 pl-4">✅ Paid</h2>
          <Accordion />
        </section>
        {/* <section className="flex flex-col gap-2 py-8">
          <InvoicesList />
          <InvoicesList />
          <InvoicesList />
          <InvoicesList />
        </section> */}
      </Role>
    </SectionWrapper>
  );
}

import {
  ChevronDownIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import {
  CloudArrowDownIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

function InvoicesList() {
  return (
    <div className="mb-2 rounded-md border border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-12 w-12" />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                INV-123
              </h3>
              <p className="text-sm text-gray-500">
                <a href="#">
                  {/* Due on 29/10/2023 */}
                  Paid 29/10/2023
                </a>
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
            <EnvelopeIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Email</span>
          </button>
        </div>
      </div>
    </div>
  );
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
                            <ChevronDownIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <ChevronRightIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
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
  );
}
