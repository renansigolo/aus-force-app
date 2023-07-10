"use client"

import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"
import { Role } from "@/components/Roles"

export default function WorkersPage() {
  return (
    <SectionWrapper>
      <Role role="business">
        <SectionHeading title="Workers" />
        <section className="py-8">
          <Empty title="workers" />
        </section>
      </Role>
    </SectionWrapper>
  )
}
