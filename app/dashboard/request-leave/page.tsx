import { RequestLeaveForm } from "@/app/dashboard/request-leave/RequestLeaveForm"
import { RequestLeaveList } from "@/app/dashboard/request-leave/RequestLeaveList"
import { Empty } from "@/components/Empty"
import { Role } from "@/components/Roles"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { getCollection } from "@/lib/firebase"

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
  const data = (await getCollection("requestLeave")) as RequestLeaveData[]
  console.log(data)

  return (
    <SectionWrapper>
      <Role role="worker">
        <SectionHeading title="Request Leave" />

        <section className="py-8">
          <RequestLeaveForm />
        </section>

        {data.length > 0 ? <RequestLeaveList data={data} /> : <Empty title="request leave" />}
      </Role>
    </SectionWrapper>
  )
}
