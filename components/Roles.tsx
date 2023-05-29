import { ReactNode } from "react"

type RoleProps = {
  role: "worker" | "client"
  children: ReactNode
}

export function Role({ role, children }: RoleProps) {
  return (
    <div
      className={`rounded-md ring-1 ${
        role === "worker" ? "ring-orange-500" : "ring-blue-500"
      }`}
    >
      {children}
    </div>
  )
}
