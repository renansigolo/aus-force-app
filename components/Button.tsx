import Link from "next/link"
import { ButtonHTMLAttributes, LinkHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  LinkHTMLAttributes<HTMLAnchorElement> & {
    href?: string
    className?: string
    children?: ReactNode
    download?: boolean
  }

export function Button({ href, className, download, ...props }: ButtonProps) {
  className = twMerge("btn btn-primary", className)

  return href ? (
    <Link href={href} className={className} {...props} download={download} />
  ) : (
    <button className={className} {...props}>
      {props.children}
    </button>
  )
}
