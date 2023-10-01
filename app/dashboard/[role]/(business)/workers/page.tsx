import { WorkersList } from "@/app/dashboard/[role]/(business)/workers/WorkersList"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"

export default function WorkersPage() {
  return (
    <PageWrapper>
      <Role role="business">
        <PageHeading title="Workers" />
        <WorkersList />
      </Role>
    </PageWrapper>
  )
}
