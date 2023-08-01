import { ReactNode } from "react"

type RoleProps = {
  role: "worker" | "client" | "business"
  children: ReactNode
}

export function Role({ role, children }: RoleProps) {
  let badgeClasses = ""
  if (role === "worker") badgeClasses = "bg-orange-100 text-orange-500 ring-orange-500"
  if (role === "client") badgeClasses = "bg-blue-100 text-blue-500 ring-blue-500"
  if (role === "business") badgeClasses = "bg-pink-100 text-pink-500 ring-pink-500"

  let roleClasses = ""
  if (role === "worker") roleClasses = "ring-orange-500"
  if (role === "client") roleClasses = "ring-blue-500"
  if (role === "business") roleClasses = "ring-pink-500"

  return (
    <>
      <span className={`rounded-lg px-3 ring-1 ${badgeClasses}`}>{role}</span>
      <div className={`rounded-md ring-1 ${roleClasses}`}>{children}</div>
    </>
  )
}
