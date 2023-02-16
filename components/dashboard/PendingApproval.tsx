import { Card } from "@/components/Card"
import {
  BuildingOffice2Icon,
  ClockIcon,
  MapIcon,
} from "@heroicons/react/20/solid"

const item = {
  name: "Today",
  company: "ACR",
  address: "377/12 Church Avenue",
  time: "7am - 3pm",
}

export default function PendingApproval() {
  return (
    <>
      <h2 className="heading-3 mb-3">Waiting Approval</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div key={item.name}>
            <dt className="text-lg font-semibold leading-8 text-gray-900">
              {item.name}
            </dt>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li className="flex gap-x-3">
                <BuildingOffice2Icon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {item.company}
              </li>
              <li className="flex gap-x-3">
                <MapIcon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {item.address}
              </li>
              <li className="flex gap-x-3">
                <ClockIcon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {item.time}
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </>
  )
}
