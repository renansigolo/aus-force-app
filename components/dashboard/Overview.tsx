import {
  BuildingOffice2Icon,
  ClockIcon,
  MapIcon,
} from "@heroicons/react/24/outline"

const stats = [
  {
    name: "Today",
    company: "ACR",
    address: "377/12 Church Avenue",
    time: "7am - 3pm",
  },
  {
    name: "Tomorrow",
    company: "NSAC",
    address: "6 Mackenzie St.",
    time: "9am - 5pm",
  },
  {
    name: "Until 03 March",
    company: "CAPA",
    address: "333 George St",
    time: "8am - 4pm",
  },
]

export function Overview() {
  return (
    <div>
      <h2 className="heading-3 mb-3">Overview</h2>
      <dl className="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
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
        ))}
      </dl>
    </div>
  )
}
