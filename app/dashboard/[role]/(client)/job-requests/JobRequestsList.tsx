"use client"

import { JobRequest } from "@/app/dashboard/[role]/(client)/job-requests/page"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card"
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
        <Card key={item.id}>
          <CardHeader>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Job Request {index + 1}
              </h3>
              <span className="text-xs font-medium text-gray-400">ID: {item.id}</span>
            </div>
            <div>
              {item.status !== "allocated" && (
                <Badge className="gap-x-1 bg-yellow-50 text-yellow-800 ring-yellow-600/20 sm:text-sm">
                  <ExclamationTriangleIcon className="h-5 w-5" /> Waiting Allocation
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex-1">
              <ListItem label="Job site" value={item.jobSite} />
              <ListItem label="Job position" value={`${item.quantity}x ${item.jobPosition}`} />
              <ListItem label="Start Date" value={item.startDateTime} />
              <ListItem label="End Date" value={item.endDateTime} />
              <ListItem label="Break" value={item.break ? "Yes" : "No"} />
              <ListItem label="Supplier" value={item.supplier} />
              <ListItem label="Service description" value={item.serviceDescription} />
              <ListItem label="Additional notes" value={item.additionalNotes} />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="button"
              className="btn-secondary hover:text-red-500"
              onClick={() => deleteLeaveRequest(item.id)}
            >
              <TrashIcon className="h-5 w-5" /> Delete
            </Button>
          </CardFooter>
        </Card>
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
