import { StaffAccordion } from "@/app/dashboard/staff/StaffAccordion"
import { StaffForm } from "@/app/dashboard/staff/StaffForm"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { SearchParams } from "@/lib/schemas"

export type StaffListDataProps = {
  email: string
  role: "Supervisor" | "Manager"
}

export type AccordionProps = {
  title: string
  staff: StaffListDataProps[]
}

const accordionData: AccordionProps[] = [
  {
    title: "Job Site A",
    staff: [
      { email: "vini@outlook.com", role: "Manager" },
      { email: "renan@gmail.com", role: "Supervisor" },
      { email: "fabi@gmail.com", role: "Supervisor" },
    ],
  },
  {
    title: "Job Site B",
    staff: [
      { email: "vini@outlook.com", role: "Manager" },
      { email: "renan@gmail.com", role: "Supervisor" },
      { email: "fabi@gmail.com", role: "Supervisor" },
    ],
  },
  {
    title: "Job Site C",
    staff: [
      { email: "vini@outlook.com", role: "Manager" },
      { email: "renan@gmail.com", role: "Supervisor" },
      { email: "fabi@gmail.com", role: "Supervisor" },
    ],
  },
]

type StaffPageProps = { searchParams: SearchParams }

export default function StaffPage({ searchParams }: StaffPageProps) {
  const showModal = searchParams.showModal === "true"

  return (
    <>
      <SectionWrapper>
        <Role role="client">
          <SectionHeading title="Staff" buttonLabel="New Staff" />
          <section className="py-8">
            {accordionData ? (
              <StaffAccordion accordionData={accordionData} />
            ) : (
              <Empty title="staff" />
            )}
          </section>
        </Role>

        <ModalWrapper title="New Staff" showModal={showModal}>
          <StaffForm accordionData={accordionData} />
        </ModalWrapper>
      </SectionWrapper>
    </>
  )
}
