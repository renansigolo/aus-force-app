"use client"

import { updateDocument } from "@/lib/firebase"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

export type WorkerProfile = {
  id: string
  name: string
  role: string
  imageUrl: string
  hasAllocatedRates: boolean
}

const workers = [
  {
    id: "leslie-alexander",
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    hasAllocatedRates: false,
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "jenny-wilson",
    name: "Jenny Wilson",
    role: "Co-Founder / CTO",
    hasAllocatedRates: false,
    imageUrl:
      "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
  },
  {
    id: "kristin-watson",
    name: "Kristin Watson",
    role: "Business Relations",
    hasAllocatedRates: false,
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
  },
  {
    id: "lindsay-walton",
    name: "Lindsay Walton",
    role: "Front-end Developer",
    hasAllocatedRates: false,
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "courtney-henry",
    name: "Courtney Henry",
    role: "Designer",
    hasAllocatedRates: false,
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "tom-cook",
    name: "Tom Cook",
    role: "Director of Product",
    hasAllocatedRates: false,
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]

export function AllocateWorkerModal() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobRequestId = searchParams.get("jobRequestId") as string

  const allocateWorker = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedWorker = workers.find(
      (worker) => worker.name === event.currentTarget.dataset.name,
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
        {workers.map((worker, index) => (
          <li key={worker.name} className="flex items-center justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <Image
                priority={index < 3}
                width={48}
                height={48}
                src={worker.imageUrl}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                alt="Worker profile image"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{worker.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{worker.role}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <button
                data-name={worker.name}
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
