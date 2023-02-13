"use client"

import Link from "next/link"

export function Navbar() {
  return (
    <nav className="mb-2 bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <Link href="/log-in" className="btn">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
