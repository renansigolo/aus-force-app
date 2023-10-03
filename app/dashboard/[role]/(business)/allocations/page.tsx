import { AllocateWorkerModal } from "@/app/dashboard/[role]/(business)/allocations/AllocateWorkerModal"
import { AllocationsList } from "@/app/dashboard/[role]/(business)/allocations/AllocationsList"
import { JobRequest } from "@/app/dashboard/[role]/(client)/job-requests/page"
import { DatabaseUser } from "@/app/dashboard/profile/page"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { getCollectionQuery } from "@/lib/firebase"
import { SearchParams } from "@/lib/schemas"
import { orderBy, where } from "firebase/firestore"

type AllocationsPageProps = { searchParams: SearchParams }
export default async function AllocationsPage({ searchParams }: AllocationsPageProps) {
  const showModal = searchParams.showModal === "true"
  const data = await getCollectionQuery<JobRequest>("jobRequests", orderBy("createdAt", "desc"))
  const workers = await getCollectionQuery<DatabaseUser>("users", where("role", "==", "worker"))

  return (
    <>
      <PageWrapper>
        <Role role="business">
          <PageHeading title="Allocations" />
          {data.length > 0 ? <AllocationsList data={data} /> : <Empty title="allocations" />}
        </Role>
      </PageWrapper>

      <ModalWrapper title="Allocate Worker" showModal={showModal}>
        <AllocateWorkerModal workers={workers} />
      </ModalWrapper>
    </>
  )
}
