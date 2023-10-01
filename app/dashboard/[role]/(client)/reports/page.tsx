import { ReportsContent } from "@/app/dashboard/[role]/(client)/reports/ReportsContent"
import { Empty } from "@/components/Empty"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"

const data = []

export default function ReportsPage() {
  return (
    <PageWrapper>
      <Role role="client">
        <PageHeading title="Reports" buttonLabel={data.length === 0 ? "" : "Download PDF"} />

        <div className="grid gap-4">
          {data.length === 0 ? <Empty title="report" /> : <ReportsContent />}
        </div>
      </Role>
    </PageWrapper>
  )
}
