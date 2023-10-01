import { Container } from "@/components/Container"
import { ReactNode } from "react"

type PageWrapperProps = {
  children: ReactNode
}
export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <Container>
      <div className="mx-auto max-w-4xl">{children}</div>
    </Container>
  )
}
