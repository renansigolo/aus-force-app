"use client"

import { AccordionProps, StaffListDataProps } from "@/app/dashboard/staff/page"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, ChevronRightIcon, UserCircleIcon } from "@heroicons/react/20/solid"

type StaffAccordionProps = {
  accordionData: AccordionProps[]
}

export function StaffAccordion({ accordionData }: StaffAccordionProps) {
  return (
    <>
      {accordionData.map((item) => (
        <div key={item.title} className="mb-2 rounded-lg bg-white shadow">
          <div className="mx-auto px-2 pb-6">
            <div className="mx-auto divide-gray-900/10">
              <dl className="space-y-6 divide-y divide-gray-900/10">
                <Disclosure as="div" className="pt-6">
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
                        </Disclosure.Button>
                      </dt>

                      <Disclosure.Panel as="dd" className="mt-2 px-2">
                        {item.staff.map((item) => (
                          <StaffAccordionItem {...item} key={item.email} />
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </dl>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

function StaffAccordionItem(props: StaffListDataProps) {
  const { email, role } = props

  return (
    <div className="mb-2 rounded-md border border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-12 w-12" />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">{role}</h3>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
