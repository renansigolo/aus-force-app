import { JobRequest } from "@/app/dashboard/job-requests/page"
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
            <p className="text-sm font-medium text-gray-900">Job Request {index + 1}</p>
            <p className="text-sm text-gray-500">{item.jobSite}</p>
            <p className="text-sm text-gray-500">
              {item.quantity}x {item.jobPosition}
            </p>
            <p className="text-sm text-gray-500">
              {item.startDateTime} - {item.endDateTime}
            </p>
            <p className="text-sm text-gray-500">{item.break ? "With" : "No"} Break</p>
            <p className="text-sm text-gray-500">{item.supplier}</p>
            <p className="text-sm text-gray-500">{item.serviceDescription}</p>
            <p className="text-sm text-gray-500">{item.additionalNotes}</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-md bg-yellow-50 px-2 py-1 text-sm text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              <ExclamationTriangleIcon className="h-6 w-6" /> Waiting Allocation
            </span>
            <button type="button" className="btn gap-2">
              <XCircleIcon className="h-6 w-6" /> Cancel Request
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
