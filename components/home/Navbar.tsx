"use client"

import { auth } from "@/lib/firebase"
import { classNames } from "@/lib/helpers"
import { Menu, Transition } from "@headlessui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Fragment } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

export function Navbar() {
  const [user] = useAuthState(auth)

  return (
    <nav className=" bg-white shadow">
      <div className="mx-auto mb-1 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 content-center justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <img
                  className="h-9 w-auto lg:block"
                  src="/logo.svg"
                  alt="Your Company"
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center sm:ml-6">
            {user ? (
              <Profile />
            ) : (
              <Link href="/log-in" className="btn">
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function Profile() {
  const router = useRouter()
  const logout = () => {
    auth.signOut().then(() => {
      router.push("/")
    })
  }
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
            alt="User Profile Image"
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
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/dashboard/profile"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Your Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-left text-sm text-gray-700"
                )}
                onClick={logout}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
