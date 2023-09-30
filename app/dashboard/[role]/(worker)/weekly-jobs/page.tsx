import { Calendar } from "@/app/dashboard/[role]/(worker)/weekly-jobs/Calendar"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"

export default function WeeklyJobsPage() {
  return (
    <PageWrapper>
      <Role role="worker">
        <PageHeading title="Weekly Jobs" />
        <Calendar />
      </Role>
    </PageWrapper>
  )
}
