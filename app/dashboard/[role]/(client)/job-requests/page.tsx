import { JobRequestsForm } from "@/app/dashboard/[role]/(client)/job-requests/JobRequestsForm"
import { JobRequestsList } from "@/app/dashboard/[role]/(client)/job-requests/JobRequestsList"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { getCollectionQuery } from "@/lib/firebase"
import { SearchParams } from "@/lib/schemas"

export type JobRequest = {
  id: string
  createdAt: Date
  jobSite: string
  jobPosition: string
  startDateTime: string
  endDateTime: string
  break: boolean
  additionalNotes: string
  supplier: string
  quantity: number
  serviceDescription: string
}

type JobRequestsPageProps = { searchParams: SearchParams }

export default async function JobRequestsPage({ searchParams }: JobRequestsPageProps) {
  const data = (await getCollectionQuery("jobRequests", "createdAt")) as JobRequest[]
  const showModal = searchParams.showModal === "true"

  return (
    <SectionWrapper>
      <Role role="client">
        <SectionHeading title="Job Requests" buttonLabel="New Job Request" />

        <section className="py-8">
          {data.length > 0 ? <JobRequestsList data={data} /> : <Empty title="job requests" />}
        </section>
      </Role>

      <ModalWrapper title="New Job" showModal={showModal}>
        <JobRequestsForm />
      </ModalWrapper>
    </SectionWrapper>
  )
}
