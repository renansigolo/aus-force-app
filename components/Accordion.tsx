"use client"

import { RatesForm } from "@/app/dashboard/[role]/(business)/rates/RatesForm"
import Modal from "@/components/Modal"
import NiceModal from "@ebay/nice-modal-react"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { ReactNode } from "react"

type AccordionProps = {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="rounded-lg bg-white shadow">
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

type AccordionItem = {
  title: string
  children: ReactNode
}

function AccordionItem({ title, children }: AccordionItem) {
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
            <button
              type="button"
              className="z-20 p-3 hover:cursor-pointer"
              onClick={() =>
                NiceModal.show(Modal, {
                  title: "New Rates",
                  children: <RatesForm />,
                })
              }
            >
              <PencilSquareIcon className="h-6 w-6 text-indigo-600 hover:text-indigo-500" />
            </button>
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
