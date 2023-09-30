import { ReactNode } from "react"

type CardProps = {
  header?: ReactNode
  children: ReactNode
  footer?: ReactNode
}
export function Card({ header, children, footer }: CardProps) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      {header && <CardHeader>{header}</CardHeader>}
      <div className="px-4 py-5 sm:p-6">{children}</div>
      {footer && <CardFooter>{footer}</CardFooter>}
    </div>
  )
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="px-4 py-5 sm:px-6">{children}</div>
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <div className="flex flex-row-reverse px-4 py-4 sm:px-6">{children}</div>
}
