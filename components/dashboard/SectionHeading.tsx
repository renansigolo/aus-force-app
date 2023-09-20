"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

type SectionHeadingProps = {
  title: string
  buttonLabel?: string
}

export function SectionHeading({ title, buttonLabel }: SectionHeadingProps) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between">
      <h2 className="heading-2">{title}</h2>
      {buttonLabel && (
        <Link className="btn btn-primary" href={"?showModal=true"}>
          {buttonLabel}
        </Link>
      )}
    </div>
  )
}
