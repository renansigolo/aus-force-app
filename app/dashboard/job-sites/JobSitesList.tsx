import { JobSitesListDataProps } from "@/app/dashboard/job-sites/page"
import {
  BuildingOffice2Icon,
  CloudArrowDownIcon,
  MapPinIcon,
  NoSymbolIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"

export function JobSitesList(props: JobSitesListDataProps) {
  return (
    <div className="mb-2 rounded-md border border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <BuildingOffice2Icon className="h-12 w-12" />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">{props.siteName}</h3>

              <div className="mb-2 mt-1 flex flex-col gap-1">
                <p className="inline-flex items-center gap-x-1 text-sm text-gray-500">
                  <MapPinIcon className="h-6 w-6" />
                  {props.siteAddress}
                </p>
                <p className="inline-flex items-center gap-x-1 text-sm text-gray-500">
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
            <div className="flex">
              <Link href={props.policyAndProceduresURL}>
                <button
                  type="button"
                  className="relative inline-flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <CloudArrowDownIcon
                    className="mr-1.5 h-10 w-10 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Policy And Procedures</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
