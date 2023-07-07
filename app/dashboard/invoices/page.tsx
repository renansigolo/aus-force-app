"use client"

import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"
import { Role } from "@/components/Roles"

export default function InvoicesPage() {
  return (
    <SectionWrapper>
      <Role role="business">
        <SectionHeading title="Invoices" />
        <section className="py-8">
          <Empty title="invoices" />
        </section>
      </Role>
    </SectionWrapper>
  )
}
