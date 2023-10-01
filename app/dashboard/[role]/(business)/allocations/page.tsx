import { AllocateWorkerModal } from "@/app/dashboard/[role]/(business)/allocations/AllocateWorkerModal"
import { AllocationsList } from "@/app/dashboard/[role]/(business)/allocations/AllocationsList"
import { JobRequest } from "@/app/dashboard/[role]/(client)/job-requests/page"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { getCollectionQuery } from "@/lib/firebase"
import { SearchParams } from "@/lib/schemas"
import { orderBy } from "firebase/firestore"

type AllocationsPageProps = { searchParams: SearchParams }
export default async function AllocationsPage({ searchParams }: AllocationsPageProps) {
  const showModal = searchParams.showModal === "true"
  const data = (await getCollectionQuery(
    "jobRequests",
    orderBy("createdAt", "desc"),
  )) as JobRequest[]

  return (
    <PageWrapper>
      <Role role="business">
        <PageHeading title="Allocations" />

        <section className="py-8">
          {data.length > 0 ? <AllocationsList data={data} /> : <Empty title="allocations" />}
        </section>
      </Role>

      <ModalWrapper title="Allocate Worker" showModal={showModal}>
        <AllocateWorkerModal />
      </ModalWrapper>
    </PageWrapper>
  )
}
