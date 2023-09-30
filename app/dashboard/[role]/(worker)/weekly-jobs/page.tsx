import { Calendar } from "@/app/dashboard/[role]/(worker)/weekly-jobs/Calendar"
import { Role } from "@/components/Roles"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { SectionHeading } from "@/components/dashboard/SectionHeading"

export default function WeeklyJobsPage() {
  return (
    <PageWrapper>
      <Role role="worker">
        <SectionHeading title="Weekly Jobs" />
        <Calendar />
      </Role>
    </PageWrapper>
  )
}
