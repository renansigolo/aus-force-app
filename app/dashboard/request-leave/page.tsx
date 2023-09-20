import { RequestLeaveForm } from "@/app/dashboard/request-leave/RequestLeaveForm"
import { Role } from "@/components/Roles"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"

export default function RequestLeavePage() {
  return (
    <SectionWrapper>
      <Role role="worker">
        <SectionHeading title="Request Leave" />

        <section className="py-8">
          <RequestLeaveForm />
        </section>
      </Role>
    </SectionWrapper>
  )
}
