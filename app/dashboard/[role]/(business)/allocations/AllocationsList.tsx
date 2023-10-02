"use client"

import { RatesForm } from "@/app/dashboard/[role]/(business)/rates/RatesForm"
import { JobRequest } from "@/app/dashboard/[role]/(client)/job-requests/page"
import { Button } from "@/components/Button"
import { Card, CardContent, CardHeader } from "@/components/Card"
import Modal from "@/components/Modal"
import NiceModal from "@ebay/nice-modal-react"
import { ClockIcon, PencilSquareIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

type AllocationsListProps = {
  data: JobRequest[]
}

export function AllocationsList({ data }: AllocationsListProps) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {data.map((item, index) => (
        <Card key={item.id}>
          <CardHeader className="justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Job Request {index + 1}
              </h3>
              <span className="text-xs font-medium text-gray-400">ID: {item.id}</span>
            </div>
            {item.status === "pendingWorkerAllocation" ? (
              <Button className="btn-secondary" href={`?showModal=true&jobRequestId=${item.id}`}>
                <UserPlusIcon className="h-5 w-5" />
                Allocate Worker
              </Button>
            ) : (
              <>
                {item.status === "pendingRatesAllocation" ? (
                  <Button
                    className="btn-secondary"
                    onClick={() =>
                      NiceModal.show(Modal, {
                        title: "Allocate Rates",
                        children: <RatesForm />,
                      })
                    }
                  >
                    <ClockIcon className="h-5 w-5" />
                    Allocate Rates
                  </Button>
                ) : (
                  <button
                    className="hover:text-indigo-600"
                    onClick={() =>
                      NiceModal.show(Modal, {
                        title: "Edit Rates",
                        children: <RatesForm />,
                      })
                    }
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                )}
              </>
            )}
          </CardHeader>

          <CardContent>
            <div className="min-w-0 flex-1">
              <ListItem label="Job position" value={`${item.quantity}x ${item.jobPosition}`} />
              <ListItem label="Start Date" value={item.startDateTime} />
              <ListItem label="End Date" value={item.endDateTime} />
              <ListItem label="Break" value={item.break ? "Yes" : "No"} />
              <ListItem label="Supplier" value={item.supplier} />
              <ListItem label="Service description" value={item.serviceDescription} />
              <ListItem label="Additional notes" value={item.additionalNotes} />
            </div>

            <div>
              {item.allocatedWorker && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Image
                    height={48}
                    width={48}
                    className="aspect-square h-16 w-16 rounded-full bg-gray-50 object-cover"
                    src={item.allocatedWorker.photoURL || "/images/profile-placeholder.png"}
                    alt="Worker profile image"
                  />
                  <div>
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {item.allocatedWorker.displayName}
                    </p>
                    <p className="truncate text-xs leading-5 text-gray-500">
                      {item.allocatedWorker.role}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
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
