import { LeaveRequestsForm } from "@/app/dashboard/[role]/(worker)/leave-requests/LeaveRequestsForm"
import { LeaveRequestsList } from "@/app/dashboard/[role]/(worker)/leave-requests/LeaveRequestsList"
import { Empty } from "@/components/Empty"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { getCollectionQuery } from "@/lib/firebase"

export type RequestLeaveData = {
  id: string
  createdAt: Date
  reason: string
  additionalNotes: string
  status: "approved" | "pending" | "declined"
  startDate: string
  endDate: string
  policyAndProceduresURL: string
}

export default async function RequestLeavePage() {
  const data = (await getCollectionQuery("leaveRequests", "createdAt")) as RequestLeaveData[]

  return (
    <PageWrapper>
      <Role role="worker">
        <PageHeading title="Leave Requests" />

        <section className="py-8">
          <LeaveRequestsForm />
        </section>

        {data.length > 0 ? <LeaveRequestsList data={data} /> : <Empty title="leave requests" />}
      </Role>
    </PageWrapper>
  )
}
