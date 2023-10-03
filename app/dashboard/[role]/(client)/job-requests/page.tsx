import { WorkerProfile } from "@/app/dashboard/[role]/(business)/allocations/AllocateWorkerModal"
import { JobRequestsForm } from "@/app/dashboard/[role]/(client)/job-requests/JobRequestsForm"
import { JobRequestsList } from "@/app/dashboard/[role]/(client)/job-requests/JobRequestsList"
import { JobSitesData } from "@/app/dashboard/[role]/(client)/job-sites/page"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { getCollectionQuery } from "@/lib/firebase"
import { SearchParams } from "@/lib/schemas"
import { orderBy } from "firebase/firestore"

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
  status: "allocated" | "pendingWorkerAllocation" | "pendingRatesAllocation"
  allocatedWorker?: WorkerProfile
}

type JobRequestsPageProps = { searchParams: SearchParams }

export default async function JobRequestsPage({ searchParams }: JobRequestsPageProps) {
  const jobRequestsData = await getCollectionQuery<JobRequest>(
    "jobRequests",
    orderBy("createdAt", "desc"),
  )

  const jobSitesData = await getCollectionQuery<JobSitesData>(
    "jobSites",
    orderBy("siteName", "desc"),
  )

  const showModal = searchParams.showModal === "true"

  return (
    <>
      <PageWrapper>
        <Role role="client">
          <PageHeading title="Job Requests" buttonLabel="New Job Request" />
          {jobRequestsData.length === 0 ? (
            <Empty title="job requests" />
          ) : (
            <JobRequestsList data={jobRequestsData} />
          )}
        </Role>
      </PageWrapper>

      <ModalWrapper title="New Job" showModal={showModal}>
        <JobRequestsForm jobSitesData={jobSitesData} />
      </ModalWrapper>
    </>
  )
}
