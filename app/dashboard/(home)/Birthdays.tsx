"use client"

const stats = [
  {
    name: "Past",
    company: "ACR",
    address: "377/12 Church Avenue",
    time: "7am - 3pm",
    policies: "View Policies and Procedures",
  },
  {
    name: "Today",
    company: "NSAC",
    address: "6 Mackenzie St.",
    time: "9am - 5pm",
    policies: "View Policies and Procedures",
  },
  {
    name: "Upcoming",
    company: "CAPA",
    address: "333 George St",
    time: "8am - 4pm",
    policies: "View Policies and Procedures",
  },
]

const people = [
  {
    name: "Leslie Alexander",
    yearsOld: "34y",
    role: "Co-Founder",
    company: "COMP 1",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3 days ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    yearsOld: "24y",
    role: "CTO",
    company: "COMP 2",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "2 days ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    yearsOld: "54y",
    role: "Forklift Driver",
    company: "COMP 3",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "yesterday",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
]

export function Birthdays() {
  return (
    <div>
      <h2 className="heading-3 mb-3">Birthdays</h2>

      <dl className="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
        <BirthdaysList title="Past" />
        <BirthdaysList title="Today" />
        <BirthdaysList title="Upcoming" />
      </dl>
    </div>
  )
}

type BirthdaysListProps = {
  title: string
}
export function BirthdaysList(props: BirthdaysListProps) {
  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="flex justify-between text-lg font-semibold leading-8 text-gray-900">
        <ul role="list" className="w-full divide-y divide-gray-100">
          {props.title}
          {people.map((person) => (
            <li key={person.yearsOld} className="flex w-full justify-between gap-x-6 px-2 py-5">
              <div className="flex gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={person.imageUrl}
                  alt="User profile image"
                />
                <div className="min-w-0 flex-auto">
                  <p className="inline-flex align-middle text-sm font-semibold leading-6 text-gray-900">
                    {person.name} ({person.yearsOld})
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person.role} at {person.company}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
