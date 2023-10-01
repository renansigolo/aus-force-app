import { JobSitesData } from "@/app/dashboard/[role]/(client)/job-sites/page"
import { StaffList } from "@/app/dashboard/[role]/(client)/staff/StaffContent"
import { StaffForm } from "@/app/dashboard/[role]/(client)/staff/StaffForm"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { getCollectionQuery } from "@/lib/firebase"
import { SearchParams } from "@/lib/schemas"
import { orderBy } from "firebase/firestore"

export type StaffData = {
  email: string
  role: "Supervisor" | "Manager"
}

type StaffPageProps = { searchParams: SearchParams }

export default async function StaffPage({ searchParams }: StaffPageProps) {
  const showModal = searchParams.showModal === "true"

  const jobSitesData = (await getCollectionQuery(
    "jobSites",
    orderBy("siteName", "desc"),
  )) as JobSitesData[]

  return (
    <>
      <PageWrapper>
        <Role role="client">
          <PageHeading title="Staff" buttonLabel="New Staff" />

          {jobSitesData.length === 0 ? (
            <Empty title="staff" />
          ) : (
            <StaffList jobSitesData={jobSitesData} />
          )}
        </Role>

        <ModalWrapper title="New Staff" showModal={showModal}>
          <StaffForm jobSitesData={jobSitesData} />
        </ModalWrapper>
      </PageWrapper>
    </>
  )
}
