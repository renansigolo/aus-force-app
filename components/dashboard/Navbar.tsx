"use client"

import { auth } from "@/lib/firebase"
import { cn } from "@/lib/helpers"
import { Menu, Popover, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid"
import { BellIcon } from "@heroicons/react/24/outline"
import { signOut } from "firebase/auth"
import Link from "next/link"
import { usePathname } from "next/navigation"
import router from "next/router"
import { Fragment } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

const navigation = [
  { name: "Home", href: "/dashboard" },
  {
    name: "Weekly Jobs",
    href: "/dashboard/weekly-jobs",
  },
  {
    name: "Request Leave",
    href: "/dashboard/request-leave",
  },
  {
    name: "Shifts",
    href: "/dashboard/shifts",
  },
  {
    name: "Payments",
    href: "/dashboard/payments",
  },
  {
    name: "Staff",
    href: "/dashboard/staff",
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
  },
  {
    name: "Job Requests",
    href: "/dashboard/job-requests",
  },
]

const userNavigation = [{ name: "Your Profile", href: "/dashboard/profile" }]

export function Navbar() {
  const [user] = useAuthState(auth)
  const pathname = usePathname()
  console.log("🚀 ~ Navbar ~ pathname", pathname)

  const isActive = (href: string) => {
    return pathname === href
  }

  const signOutNow = () => {
    signOut(auth)
    router.reload()
  }

  return (
    <nav className="bg-white shadow">
      {/* <Profile /> */}
      <Popover
        as="header"
        className={({ open }) =>
          cn(
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
                    alt="Company Logo"
                  />

                  {/* Desktop - Authenticated Navigation Links */}
                  <nav
                    className="hidden pl-12 lg:flex lg:space-x-8"
                    aria-label="Global"
                  >
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          isActive(item.href)
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                          "inline-flex items-center rounded-md p-3 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
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

                <div className="hidden lg:flex lg:items-center lg:justify-end">
                  <Menu as="div" className="relative ml-5 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          alt="Profile Image"
                          src={
                            user?.photoURL || "/images/profile-placeholder.png"
                          }
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
                                className={cn(
                                  active ? "bg-gray-100" : "",
                                  "block py-2 px-4 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        <button
                          className="block w-full py-2 px-4 text-left text-sm text-gray-700 hover:bg-gray-100"
                          onClick={signOutNow}
                        >
                          Logout
                        </button>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              {({ close }) => (
                <>
                  <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        onClick={() => close()}
                        className={cn(
                          isActive(item.href)
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
                          alt="Profile Image"
                          src={
                            user?.photoURL || "/images/profile-placeholder.png"
                          }
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
                          onClick={() => close()}
                          className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                      <button
                        className="block w-full rounded-md py-2 px-3 text-left text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        onClick={signOutNow}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>
    </nav>
  )
}
