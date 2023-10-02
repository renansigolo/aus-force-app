"use client"

import { DatabaseUser } from "@/app/dashboard/profile/page"
import { updateDocument } from "@/lib/firebase"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

export type WorkerProfile = {
  id: string
  displayName: string
  role: string
  photoURL: string
  hasAllocatedRates: boolean
}

type AllocateWorkerModalProps = {
  workers: DatabaseUser[]
}

export function AllocateWorkerModal({ workers }: AllocateWorkerModalProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobRequestId = searchParams.get("jobRequestId") as string

  const allocateWorker = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedWorker = workers.find(
      (worker) => worker.displayName === event.currentTarget.dataset.name,
    )

    // Add worker object to job request
    // Update job request status to pendingRatesAllocation
    updateDocument("jobRequests", jobRequestId, {
      status: "pendingRatesAllocation",
      allocatedWorker: selectedWorker,
    })

    router.push("?showModal=false")
  }

  return (
    <>
      <div className="relative mt-2 flex items-center">
        <input type="text" name="search" id="search" placeholder="Search" />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            Enter
          </kbd>
        </div>
      </div>
      <ul className="divide-y divide-gray-100">
        {workers?.map((worker, index) => (
          <li key={worker.displayName} className="flex items-center justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <Image
                priority={index < 3}
                width={48}
                height={48}
                src={worker.photoURL || "/images/profile-placeholder.png"}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                alt="Worker profile image"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {worker.displayName}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{worker.role}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <button
                data-name={worker.displayName}
                className="btn btn-secondary"
                onClick={allocateWorker}
              >
                Allocate
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
