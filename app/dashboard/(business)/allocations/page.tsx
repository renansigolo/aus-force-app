"use client"

import { RatesForm } from "@/app/dashboard/(business)/rates/RatesForm"
import { Button } from "@/components/Button"
import { Empty } from "@/components/Empty"
import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import NiceModal from "@ebay/nice-modal-react"
import { ClockIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/outline"

const data = [
  {
    title: "Job Request 1",
    jobPosition: "Traffic Controller",
    startTime: new Date().toDateString(),
    endTime: new Date().toDateString(),
    break: false,
    additionalNotes: "lorem ipsum dolor sit amet",
    supplier: "Supplier B",
  },
  {
    title: "Job Request 2",
    jobPosition: "General Labour",
    startTime: new Date().toDateString(),
    endTime: new Date().toDateString(),
    break: true,
    additionalNotes: "lorem ipsum dolor sit amet",
    supplier: "Supplier A",
    allocatedWorker: {
      id: "leslie-alexander",
      name: "Leslie Alexander",
      role: "Co-Founder / CEO",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      hasAllocatedRates: true,
    },
  },
  {
    title: "Job Request 3",
    jobPosition: "General Labour",
    startTime: new Date().toDateString(),
    endTime: new Date().toDateString(),
    break: true,
    additionalNotes: "lorem ipsum dolor sit amet",
    supplier: "Supplier A",
    allocatedWorker: {
      id: "leslie-alexander",
      name: "Leslie Alexander",
      role: "Co-Founder / CEO",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      hasAllocatedRates: false,
    },
  },

  {
    title: "Job Request 4",
    jobPosition: "LO Operator",
    startTime: new Date().toDateString(),
    endTime: new Date().toDateString(),
    break: true,
    additionalNotes: "lorem ipsum dolor sit amet",
    supplier: "Supplier C",
  },
]

export default function AllocationsPage() {
  const showModal = () =>
    NiceModal.show(Modal, {
      title: "Allocate Worker",
      children: <AllocationModal />,
    })

  return (
    <SectionWrapper>
      <Role role="business">
        <SectionHeading title="Allocations" />

        <section className="py-8">
          {data.length > 0 ? (
            <AllocationsList showModal={showModal} />
          ) : (
            <Empty title="allocations" />
          )}
        </section>
      </Role>
    </SectionWrapper>
  )
}

function AllocationsList(props: any) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {data.map((item) => (
        <div
          key={item.title}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm"
        >
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-sm font-medium text-gray-900">{item.title}</p>
            <AllocationListItem label="Job position" value={item.jobPosition} />
            <AllocationListItem label="Start Date" value={item.startTime} />
            <AllocationListItem label="End Date" value={item.endTime} />
            <AllocationListItem label="Break" value={item.break ? "Yes" : "No"} />
            <AllocationListItem label="Supplier" value={item.supplier} />
            <AllocationListItem label="Additional notes" value={item.additionalNotes} />
          </div>

          <div className="flex flex-col items-center gap-2">
            {item.allocatedWorker ? (
              <div className="flex flex-col items-center gap-y-2 text-center">
                <div className="flex flex-col items-center">
                  <img
                    className="h-12 w-12 rounded-full bg-gray-50 object-cover"
                    src={item.allocatedWorker.imageUrl}
                    alt="Worker profile image"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {item.allocatedWorker.name}
                    </p>
                    <p className="truncate text-xs leading-5 text-gray-500">
                      {item.allocatedWorker.role}
                    </p>
                  </div>
                </div>

                {item.allocatedWorker.hasAllocatedRates ? (
                  <Button
                    className="btn-secondary w-44"
                    onClick={() =>
                      NiceModal.show(Modal, {
                        title: "New Rates",
                        children: <RatesForm />,
                      })
                    }
                  >
                    <ClockIcon className="h-6 w-6" />
                    Allocate Rates
                  </Button>
                ) : (
                  <Button
                    className="btn-secondary w-44"
                    onClick={() =>
                      NiceModal.show(Modal, {
                        title: "New Rates",
                        children: <RatesForm />,
                      })
                    }
                  >
                    <PencilIcon className="h-6 w-6" />
                    Edit Rates
                  </Button>
                )}
              </div>
            ) : (
              <Button className="btn-secondary w-44" onClick={props.showModal}>
                <UserPlusIcon className="h-6 w-6" />
                Allocate Worker
              </Button>
            )}
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

function AllocationListItem({ label, value }: ListItemProps) {
  return (
    <p className="text-sm text-gray-600">
      <span className="font-medium text-gray-900">{label}: </span>
      {value}
    </p>
  )
}

const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Dries Vincent",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Courtney Henry",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Tom Cook",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]

function AllocationModal() {
  return (
    <>
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            Enter
          </kbd>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {people.map((person) => (
          <li key={person.name} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={person.imageUrl}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.role}</p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <Button className="btn-secondary" onClick={() => console.log("Allocated")}>
                Allocate
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
