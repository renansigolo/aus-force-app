"use client"

import { JobSitesData } from "@/app/dashboard/[role]/(client)/job-sites/page"
import { Button } from "@/components/Button"
import { Card, CardContent, CardFooter } from "@/components/Card"
import { deleteDocument } from "@/lib/firebase"
import {
  BuildingOffice2Icon,
  CloudArrowDownIcon,
  MapPinIcon,
  NoSymbolIcon,
  TrashIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type JobSitesListProps = {
  data: JobSitesData[]
}
export function JobSitesList({ data }: JobSitesListProps) {
  const router = useRouter()
  const deleteLeaveRequest = async (id: string) => {
    await deleteDocument("jobSites", id)
    router.refresh()
    toast.success("Job site deleted")
  }

  return (
    <section className="grid gap-2">
      {data.map((jobSite, index) => (
        <Card key={index}>
          <CardContent>
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
          </CardContent>

          <CardFooter>
            <Button
              type="button"
              className="btn-secondary hover:text-red-500"
              onClick={() => deleteLeaveRequest(jobSite.id)}
            >
              <TrashIcon className="h-5 w-5" /> Delete
            </Button>

            {jobSite.policyAndProceduresURL && (
              <Link
                download
                className="btn btn-secondary"
                href={jobSite.policyAndProceduresURL}
                target="_blank"
              >
                <CloudArrowDownIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                <span className="text-xs">Policy And Procedures</span>
              </Link>
            )}
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}
