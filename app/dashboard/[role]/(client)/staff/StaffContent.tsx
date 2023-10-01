import { JobSitesData } from "@/app/dashboard/[role]/(client)/job-sites/page"
import { StaffData } from "@/app/dashboard/[role]/(client)/staff/page"
import { AccordionSplitted } from "@/components/AccordionSplitted"
import { UserCircleIcon } from "@heroicons/react/20/solid"

type StaffListProps = {
  jobSitesData: JobSitesData[]
}

export function StaffList({ jobSitesData }: StaffListProps) {
  const accordionItems = jobSitesData.map((item) => ({
    title: item.siteName,
    children: item.staff?.map((item) => <StaffItem {...item} key={item.email} />),
  }))

  return accordionItems.map((item) => <AccordionSplitted key={item.title} items={item} />)
}

export function StaffItem(props: StaffData) {
  const { email, role } = props

  return (
    <div className="mb-2 rounded-md border border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-12 w-12" />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold capitalize leading-6 text-gray-900">{role}</h3>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
