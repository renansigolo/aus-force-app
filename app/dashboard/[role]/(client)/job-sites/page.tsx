import { JobSiteForm } from "@/app/dashboard/[role]/(client)/job-sites/JobSitesForm"
import { JobSitesList } from "@/app/dashboard/[role]/(client)/job-sites/JobSitesList"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { getCollectionQuery } from "@/lib/firebase"
import { SearchParams } from "@/lib/schemas"

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
  const data = (await getCollectionQuery("jobSites", "siteName")) as JobSitesListDataProps[]
  const showModal = searchParams.showModal === "true"

  return (
    <SectionWrapper>
      <Role role="client">
        <SectionHeading title="Job Sites" buttonLabel="New Job Site" />
        <section className="py-8">
          {data.length > 0 ? (
            data.map((item) => <JobSitesList {...item} key={item.siteName} />)
          ) : (
            <Empty title="job sites" />
          )}
        </section>
      </Role>

      <ModalWrapper title="New Job Site" showModal={showModal}>
        <JobSiteForm data={data} />
      </ModalWrapper>
    </SectionWrapper>
  )
}
