import { JobRequest } from "@/app/dashboard/job-requests/page"
import { Button } from "@/components/Button"
import { ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/outline"

type JobRequestsListProps = {
  data: JobRequest[]
}

export function JobRequestsList({ data }: JobRequestsListProps) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {data.map((item, index) => (
        <div
          key={item.id}
          className="flex rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm md:items-center"
        >
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-sm font-semibold text-gray-900">Job Request {index + 1}</p>
            <ListItem label="Job site" value={item.jobSite} />
            <ListItem
              label="Job position"
              value={`${item.quantity}x ${item.jobPosition} ${item.jobPosition}`}
            />
            <ListItem label="Start Date" value={item.startDateTime} />
            <ListItem label="End Date" value={item.endDateTime} />
            <ListItem label="Break" value={item.break ? "Yes" : "No"} />
            <ListItem label="Supplier" value={item.supplier} />
            <ListItem label="Service description" value={item.serviceDescription} />
            <ListItem label="Additional notes" value={item.additionalNotes} />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-md bg-yellow-50 px-2 py-1 text-sm text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              <ExclamationTriangleIcon className="h-6 w-6" /> Waiting Allocation
            </span>
            <Button type="button" className="btn-secondary">
              <XCircleIcon className="h-6 w-6" /> Cancel Request
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

type ListItemProps = {
  label: string
  value: string
}

function ListItem({ label, value }: ListItemProps) {
  return (
    <p className="text-sm text-gray-600">
      <span className="font-medium text-gray-900">{label}: </span>
      {value}
    </p>
  )
}
