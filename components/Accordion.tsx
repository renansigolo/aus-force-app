"use client"

import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { ReactNode } from "react"

export type AccordionProps = {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="w-full rounded-lg bg-white shadow">
      <div className="mx-auto px-2 pb-6">
        <div className="mx-auto divide-gray-900/10">
          <dl className="space-y-6 divide-y divide-gray-900/10">
            {items.map((item, index) => (
              <AccordionItem {...item} key={index} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export type AccordionItem = {
  title: string
  actionButton?: ReactNode
  children: ReactNode
}

function AccordionItem({ title, actionButton, children }: AccordionItem) {
  return (
    <Disclosure as="div" className="pt-6">
      {({ open }) => (
        <>
          <dt className="flex w-full items-center justify-between text-left text-gray-900">
            <Disclosure.Button className="w-full">
              <span className="flex h-7 items-center">
                {open ? (
                  <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
                )}
                <span className="ml-2 text-base font-semibold leading-7">{title}</span>
              </span>
            </Disclosure.Button>
            <div className="flex-nowrap">{actionButton}</div>
          </dt>

          {/* Content */}
          <Disclosure.Panel as="dd" className="mt-2 px-2 ">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
