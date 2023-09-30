import { Calendar } from "@/app/dashboard/[role]/(worker)/weekly-jobs/Calendar"
import { Role } from "@/components/Roles"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"

export default function WeeklyJobsPage() {
  return (
    <SectionWrapper>
      <Role role="worker">
        <SectionHeading title="Weekly Jobs" />
        <Calendar />
      </Role>
    </SectionWrapper>
  )
}
