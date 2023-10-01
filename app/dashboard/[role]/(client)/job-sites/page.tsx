import { JobSiteForm } from "@/app/dashboard/[role]/(client)/job-sites/JobSitesForm"
import { JobSitesList } from "@/app/dashboard/[role]/(client)/job-sites/JobSitesList"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { getCollectionQuery } from "@/lib/firebase"
import { SearchParams } from "@/lib/schemas"
import { orderBy } from "firebase/firestore"

export type JobSitesListDataProps = {
  id: string
  createdAt: Date
  siteName: string
  siteAddress: string
  hasParking: boolean
  additionalNotes: string
  policyAndProceduresURL: string
}

type JobSitesPageProps = { searchParams: SearchParams }

export default async function JobSitesPage({ searchParams }: JobSitesPageProps) {
  const data = (await getCollectionQuery(
    "jobSites",
    orderBy("siteName", "asc"),
  )) as JobSitesListDataProps[]
  const showModal = searchParams.showModal === "true"

  return (
    <PageWrapper>
      <Role role="client">
        <PageHeading title="Job Sites" buttonLabel="New Job Site" />
        {data.length > 0 ? <JobSitesList data={data} /> : <Empty title="job sites" />}
      </Role>

      <ModalWrapper title="New Job Site" showModal={showModal}>
        <JobSiteForm />
      </ModalWrapper>
    </PageWrapper>
  )
}
