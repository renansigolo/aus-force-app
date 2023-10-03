"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Empty } from "@/components/Empty"
import { Role } from "@/components/Roles"
import {
  BuildingOffice2Icon,
  ClockIcon,
  DocumentTextIcon,
  MapIcon,
} from "@heroicons/react/24/outline"

type Shift = {
  name: string
  company: string
  address: string
  time: string
  policies: string
}

const shifts: Shift[] = []
// const shifts: Shift[] = [
//   {
//     name: "Today",
//     company: "ACR",
//     address: "377/12 Church Avenue",
//     time: "7am - 3pm",
//     policies: "View Policies and Procedures",
//   },
//   {
//     name: "Tomorrow",
//     company: "NSAC",
//     address: "6 Mackenzie St.",
//     time: "9am - 5pm",
//     policies: "View Policies and Procedures",
//   },
//   {
//     name: "Until 03 March",
//     company: "CAPA",
//     address: "333 George St",
//     time: "8am - 4pm",
//     policies: "View Policies and Procedures",
//   },
// ]

export function ShiftsOverview() {
  return (
    <Role role="worker">
      <div>
        <h2 className="heading-3 mb-3">Shifts Overview</h2>
        {shifts.length === 0 ? <Empty title="shift" /> : <ShiftsList shifts={shifts} />}
      </div>
    </Role>
  )
}

type ShiftsListProps = {
  shifts: Shift[]
}

function ShiftsList({ shifts }: ShiftsListProps) {
  return (
    <Card>
      <dl className="grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
        {shifts.map((item, index) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="flex justify-between text-lg font-semibold leading-8 text-gray-900">
              {item.name}
              {index === 0 && (
                <Button className="btn-secondary" href="?showModal=true">
                  Submit Shit
                </Button>
              )}
            </dt>

            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
              <li className="flex gap-x-3">
                <BuildingOffice2Icon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {item.company}
              </li>
              <li className="flex gap-x-3">
                <MapIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                {item.address}
              </li>
              <li className="flex gap-x-3">
                <ClockIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                {item.time}
              </li>
              <li className="flex gap-x-3">
                <DocumentTextIcon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {item.policies}
              </li>
            </ul>
          </div>
        ))}
      </dl>
    </Card>
  )
}
