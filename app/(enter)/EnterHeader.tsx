import Image from "next/image"
import Link from "next/link"

type EnterHeaderProps = {
  title: string
  description: string
  page?: "login" | "register" | "forgot-password"
}

export function EnterHeader({ title, description, page }: EnterHeaderProps) {
  return (
    <div className="pb-8 sm:mx-auto sm:w-full">
      <Image
        priority
        height={48}
        width={56}
        className="mx-auto h-12 w-auto"
        src="/logo.svg"
        alt="Company Logo"
      />
      <h2 className="mt-6 text-center text-3xl font-bold capitalize tracking-tight text-gray-900">
        {title}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {description}

        {page === "login" && (
          <Link href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
            register now
          </Link>
        )}
      </p>
    </div>
  )
}
