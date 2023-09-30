"use client"

import { JobRequest } from "@/app/dashboard/[role]/(client)/job-requests/page"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { deleteDocument } from "@/lib/firebase"
import { ExclamationTriangleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type JobRequestsListProps = {
  data: JobRequest[]
}

export function JobRequestsList({ data }: JobRequestsListProps) {
  const router = useRouter()
  const deleteLeaveRequest = async (id: string) => {
    await deleteDocument("jobRequests", id)
    router.refresh()
    toast.success("Job request deleted")
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {data.map((item, index) => (
        <div
          key={item.id}
          className="flex rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm md:items-center"
        >
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-sm font-semibold text-gray-900">
              Job Request {index + 1}
              <br />
              <span className="text-xs font-medium text-gray-400">ID: {item.id}</span>
            </p>

            <ListItem label="Job site" value={item.jobSite} />
            <ListItem label="Job position" value={`${item.quantity}x ${item.jobPosition}`} />
            <ListItem label="Start Date" value={item.startDateTime} />
            <ListItem label="End Date" value={item.endDateTime} />
            <ListItem label="Break" value={item.break ? "Yes" : "No"} />
            <ListItem label="Supplier" value={item.supplier} />
            <ListItem label="Service description" value={item.serviceDescription} />
            <ListItem label="Additional notes" value={item.additionalNotes} />
          </div>

          <div className="flex flex-col items-center gap-2">
            {item.status !== "allocated" && (
              <Badge className="gap-1 bg-yellow-50 text-sm text-yellow-800 ring-yellow-600/20">
                <ExclamationTriangleIcon className="h-5 w-5" /> Waiting Allocation
              </Badge>
            )}
            <Button
              type="button"
              className="btn-secondary hover:text-red-500"
              onClick={() => deleteLeaveRequest(item.id)}
            >
              <TrashIcon className="h-5 w-5" /> Delete
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
