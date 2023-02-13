import { Container } from "@/components/Container"
import { ReactNode } from "react"

type SectionWrapperProps = {
  children: ReactNode
}
export function SectionWrapper({ children }: SectionWrapperProps) {
  return (
    <section className="flex-1">
      <div className="relative mx-auto max-w-4xl pt-10 pb-16">
        <Container>{children}</Container>
      </div>
    </section>
  )
}
