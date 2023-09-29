"use client"

import Link from "next/link"

type SectionHeadingProps = {
  title: string
  buttonLabel?: string
}

export function SectionHeading({ title, buttonLabel }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="md:text-3xl; text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
      {buttonLabel && (
        <Link className="btn btn-primary" href={"?showModal=true"}>
          {buttonLabel}
        </Link>
      )}
    </div>
  )
}
