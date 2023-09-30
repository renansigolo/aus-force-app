import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type BadgeProps = {
  children: ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  className = twMerge(
    "inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:cursor-default",
    className,
  )

  return <span className={className}>{children}</span>
}
