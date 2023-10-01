"use client"

import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { Fragment } from "react"
import { twMerge } from "tailwind-merge"

export function Popover() {
  return (
    <Menu as="div" className="relative z-30 flex-shrink-0">
      <div>
        <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/dashboard/business/rates"
                className={twMerge(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-left text-sm text-gray-700",
                )}
              >
                Manage Rates
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="?showModal=true"
                className={twMerge(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-left text-sm text-gray-700",
                )}
              >
                Edit
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => console.log("Button Clicked")}
                className={twMerge(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-left text-sm text-gray-700",
                )}
              >
                Delete
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
