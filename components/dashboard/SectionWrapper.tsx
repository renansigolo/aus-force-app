import { ReactNode } from "react"

type SectionWrapperProps = {
  children: ReactNode
}
export function SectionWrapper({ children }: SectionWrapperProps) {
  return (
    <section className="flex-1">
      <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0 pt-10 pb-16">
        {children}
      </div>
    </section>
  )
}
