"use client"

import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"
import { Role } from "@/components/Roles"

export default function PayrollPage() {
  return (
    <SectionWrapper>
      <Role role="business">
        <SectionHeading title="Payroll" />
        <section className="py-8">
          <Empty title="payroll" />
        </section>
      </Role>
    </SectionWrapper>
  )
}
