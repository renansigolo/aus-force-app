import Link from "next/link"
import { ButtonHTMLAttributes, LinkHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  LinkHTMLAttributes<HTMLAnchorElement> & {
    href?: string
    className?: string
    children?: ReactNode
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
