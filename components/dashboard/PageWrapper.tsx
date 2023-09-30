import { Container } from "@/components/Container"
import { ReactNode } from "react"

type PageWrapperProps = {
  children: ReactNode
}
export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <section className="flex-1">
      <div className="relative mx-auto max-w-4xl pb-16 pt-10">
        <Container>{children}</Container>
      </div>
    </section>
  )
}
