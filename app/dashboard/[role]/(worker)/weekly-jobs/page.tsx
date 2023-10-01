import { Calendar } from "@/app/dashboard/[role]/(worker)/weekly-jobs/Calendar"
import { Empty } from "@/components/Empty"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"

const data = []

export default function WeeklyJobsPage() {
  return (
    <PageWrapper>
      <Role role="worker">
        <PageHeading title="Weekly Jobs" />
        {data.length > 0 ? <Calendar /> : <Empty title="weekly job" />}
      </Role>
    </PageWrapper>
  )
}
