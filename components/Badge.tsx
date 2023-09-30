import { ReactNode } from "react"

type BadgeProps = {
  children: ReactNode
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
      {children}
    </span>
  )
}
