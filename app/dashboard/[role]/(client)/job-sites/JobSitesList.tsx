import { JobSitesListDataProps } from "@/app/dashboard/[role]/(client)/job-sites/page"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import {
  BuildingOffice2Icon,
  CloudArrowDownIcon,
  MapPinIcon,
  NoSymbolIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"

type JobSitesListProps = {
  data: JobSitesListDataProps[]
}
export function JobSitesList({ data }: JobSitesListProps) {
  return (
    <section className="grid gap-4">
      {data.map((jobSite, index) => (
        <Card
          key={index}
          footer={
            jobSite.policyAndProceduresURL && (
              <Button className="btn-secondary" href={jobSite.policyAndProceduresURL}>
                <CloudArrowDownIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                <span className="text-xs">Policy And Procedures</span>
              </Button>
            )
          }
        >
          <div className="flex w-full">
            <div className="flex flex-col items-center justify-center">
              <BuildingOffice2Icon className="h-14 w-14 flex-shrink-0" />
            </div>

            <div className="ml-4 w-full">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {jobSite.siteName}
              </h3>
              <div className="mb-2 mt-1 flex flex-col gap-1">
                <p className="inline-flex items-center gap-x-1 text-sm text-gray-500">
                  <MapPinIcon className="h-6 w-6" />
                  {jobSite.siteAddress}
                </p>
                <p className="inline-flex items-center gap-x-1 text-sm text-gray-500">
                  {jobSite.hasParking ? (
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
              <p className="text-sm text-gray-500">{jobSite.additionalNotes}</p>
            </div>
          </div>
        </Card>
      ))}
    </section>
  )
}
