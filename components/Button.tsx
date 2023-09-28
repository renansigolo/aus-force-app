import Link from "next/link"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = {
  href?: string
  className?: string
  children?: ReactNode
  disabled?: boolean
  // [key: string]: ButtonHTMLAttributes<HTMLButtonElement>["value"]
}

export function Button({ href, className, ...props }: ButtonProps) {
  className = twMerge("btn btn-primary", className)

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props}>
      {props.children}
    </button>
  )
}
