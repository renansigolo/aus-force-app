import { ReactNode } from "react"

type RoleProps = {
  role: "worker" | "client"
  children: ReactNode
}

export function Role({ role, children }: RoleProps) {
  return (
    <>
      <span
        className={`rounded-lg px-3 ring-1 
        ${role === "worker" ? "ring-orange-500" : "ring-blue-500"}
        ${role === "worker" ? "bg-orange-100" : "bg-blue-100"}
        ${role === "worker" ? "text-orange-500" : "text-blue-500"}
        `}
      >
        {role}
      </span>
      <div
        className={`rounded-md ring-1 ${
          role === "worker" ? "ring-orange-500" : "ring-blue-500"
        }`}
      >
        {children}
      </div>
    </>
  )
}
