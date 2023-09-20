import { JobSiteForm } from "@/app/dashboard/job-sites/JobSiteForm"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { SearchParams } from "@/lib/schemas"
import {
  BuildingOffice2Icon,
  CloudArrowDownIcon,
  NoSymbolIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"

export type JobSitesListDataProps = {
  siteName: string
  siteAddress: string
  hasParking: boolean
  additionalNotes: string
  policyAndProceduresURL: string
}

const jobSitesListData: JobSitesListDataProps[] = [
  {
    siteName: "Job Site A",
    siteAddress: "377/12 Church Avenue, Mascot NSW 2020",
    hasParking: true,
    additionalNotes:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ipsam accusamus qui quibusdam ducimus provident illum ullam et itaque beatae minus, pariatur quasi alias deserunt? Perspiciatis alias corrupti officia error!",
    policyAndProceduresURL: "",
  },
  {
    siteName: "Job Site B",
    siteAddress: "132/35 La La Land, Bondi Junction NSW 2021",
    hasParking: false,
    additionalNotes:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ipsam accusamus qui quibusdam ducimus provident illum ullam et itaque beatae minus, pariatur quasi alias deserunt? Perspiciatis alias corrupti officia error!",
    policyAndProceduresURL: "#",
  },
  {
    siteName: "Job Site C",
    siteAddress: "1325 Le Factory, Cooggee NSW 2030",
    hasParking: false,
    additionalNotes: "",
    policyAndProceduresURL: "#",
  },
]

type JobSitesPageProps = { searchParams: SearchParams }

export default function JobSitesPage({ searchParams }: JobSitesPageProps) {
  const showModal = searchParams.showModal === "true"

  return (
    <SectionWrapper>
      <Role role="client">
        <SectionHeading title="Job Sites" buttonLabel="New Site" />
        <section className="py-8">
          {jobSitesListData ? (
            jobSitesListData.map((item) => <JobSitesList {...item} key={item.siteName} />)
          ) : (
            <Empty title="job sites" />
          )}
        </section>
      </Role>

      <ModalWrapper title="New Job Site" showModal={showModal}>
        <JobSiteForm data={jobSitesListData} />
      </ModalWrapper>
    </SectionWrapper>
  )
}

function JobSitesList(props: JobSitesListDataProps) {
  return (
    <div className="mb-2 rounded-md border border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BuildingOffice2Icon className="h-12 w-12" />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">{props.siteName}</h3>

              <div className="mb-2 mt-1">
                <p className="text-sm text-gray-500">{props.siteAddress}</p>
                <p className="inline-flex items-center gap-1 text-sm text-gray-500">
                  {props.hasParking ? (
                    <>
                      <TruckIcon className="h-6 w-6" /> Parking Available
                    </>
                  ) : (
                    <>
                      <NoSymbolIcon className="h-5 w-5" /> No Parking
                    </>
                  )}
                </p>
              </div>

              <p className="text-sm text-gray-500">{props.additionalNotes}</p>
            </div>
          </div>
        </div>

        <div className="ml-4 mt-4 flex flex-shrink-0">
          <a href={props.policyAndProceduresURL}>
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <CloudArrowDownIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Policy And Procedures</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
