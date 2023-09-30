"use client"

import { StaffAccordion } from "@/app/dashboard/[role]/(client)/staff/StaffAccordion"
import { StaffForm } from "@/app/dashboard/[role]/(client)/staff/StaffForm"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SearchParams } from "@/lib/schemas"

export type StaffListDataProps = {
  email: string
  role: "Supervisor" | "Manager"
}

export type AccordionProps = {
  title: string
  staff: StaffListDataProps[]
}

const accordionData: AccordionProps[] = []

type StaffPageProps = { searchParams: SearchParams }

export default function StaffPage({ searchParams }: StaffPageProps) {
  const showModal = searchParams.showModal === "true"

  return (
    <>
      <PageWrapper>
        <Role role="client">
          <SectionHeading title="Staff" buttonLabel="New Staff" />
          <section className="py-8">
            {accordionData.length > 0 ? (
              <StaffAccordion accordionData={accordionData} />
            ) : (
              <Empty title="staff" />
            )}
          </section>
        </Role>

        <ModalWrapper title="New Staff" showModal={showModal}>
          <StaffForm accordionData={accordionData} />
        </ModalWrapper>
      </PageWrapper>
    </>
  )
}
