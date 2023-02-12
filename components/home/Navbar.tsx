"use client"

import Link from "next/link"

export function Navbar() {
  return (
    <nav className="bg-white shadow mb-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between content-center">
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
          <div className="sm:ml-6 flex items-center">
            <Link href="/sign-in" className="btn">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
