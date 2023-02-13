"use client"

import Link from "next/link"

type EnterHeaderProps = {
  title: string
  description: string
  page?: "sign-in" | "register" | "forgot-password"
}

export function EnterHeader({ title, description, page }: EnterHeaderProps) {
  return (
    <>
      <div className="pb-12 sm:mx-auto sm:w-full">
        <img
          className="mx-auto h-12 w-auto"
          src="/logo.svg"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {description}

          {page === "sign-in" && (
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              register now
            </Link>
          )}
        </p>
      </div>
    </>
  )
}
