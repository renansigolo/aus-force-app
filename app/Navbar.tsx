"use client"

import { mockIsAuth } from "@/lib/constants"
import { auth } from "@/lib/firebase"
import { classNames } from "@/lib/helpers"
import { Menu, Popover, Transition } from "@headlessui/react"
import {
  BanknotesIcon,
  Bars3Icon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ClockIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid"
import { BellIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { Fragment } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

const navigation = [
  { name: "Home", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Weekly Jobs",
    href: "/dashboard/weekly-jobs",
    icon: CalendarDaysIcon,
    current: false,
  },
  {
    name: "Request Leave",
    href: "/dashboard/request-leave",
    icon: BriefcaseIcon,
    current: false,
  },
  {
    name: "Timesheets",
    href: "/dashboard/timesheets",
    icon: ClockIcon,
    current: false,
  },
  {
    name: "Payments",
    href: "/dashboard/payments",
    icon: BanknotesIcon,
    current: false,
  },
]

const userNavigation = [
  { name: "Your Profile", href: "/dashboard/profile" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "/log-in" },
]

export function Navbar() {
  const [user] = useAuthState(auth)
  console.log("🚀 ~ Navbar ~ user", user)

  return (
    <nav className="bg-white shadow">
      {/* <Profile /> */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-white py-4 shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-6">
              <div className="relative flex justify-between lg:gap-8">
                {/* Left Desktop Navbar */}
                <div className="flex flex-shrink-0 items-center">
                  {/* Logo Image */}
                  <img
                    className="block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />

                  {/* Desktop - Authenticated Navigation Links */}
                  {mockIsAuth && (
                    <nav
                      className="hidden pl-12 lg:flex lg:space-x-8"
                      aria-label="Global"
                    >
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                            "inline-flex items-center rounded-md p-3 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  )}
                </div>

                {/* Mobile - Right Navbar */}
                <div className="flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>

                {/* Desktop - Profile dropdown */}
                {mockIsAuth && (
                  <div className="hidden lg:flex lg:items-center lg:justify-end">
                    <Menu as="div" className="relative ml-5 flex-shrink-0">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              user?.photoURL ||
                              "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                            }
                            alt=""
                          />
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
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block py-2 px-4 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "hover:bg-gray-50",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.photoURL || "/images/profile-placeholder"}
                      alt="Profile Image"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user?.displayName || ""}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user?.email || ""}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </nav>
  )
}
