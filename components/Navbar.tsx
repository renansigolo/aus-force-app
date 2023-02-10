"use client"

import Link from "next/link"

export function Navbar() {
  return (
    <nav className="bg-white shadow mb-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <img
                  className="h-8 w-auto lg:block"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </Link>
            </div>
          </div>
          <div className="sm:ml-6 sm:flex sm:items-center">
            <div className="relative ml-3">
              <Link href="/sign-in" className="btn">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
