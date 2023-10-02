import { RequestLeaveData } from "@/app/dashboard/[role]/(worker)/leave-requests/page"
import { Card } from "@/components/Card"
import { getCollection } from "@/lib/firebase"

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
    name: "Jenny Wilson",
    yearsOld: "24y",
    role: "CTO",
    company: "COMP 2",
    imageUrl:
      "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    lastSeen: "2 days ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Kristin Watson",
    yearsOld: "54y",
    role: "Forklift Driver",
    company: "COMP 3",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    lastSeen: "yesterday",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
]

export async function Leaves() {
  const data = (await getCollection("leaveRequests")) as RequestLeaveData[]
  if (!data.length) return null

  // const usersData: any[] = []
  // data.map(async (leaveRequest) => {
  //   const user = await getCollectionQuery("users", where("uid", "==", leaveRequest.requestedBy))
  //   usersData.push({
  //     leave: leaveRequest,
  //     user: user[0],
  //   })
  // })

  return (
    <div>
      <h2 className="heading-3 mb-3">Leaves</h2>
      <Card>
        <div className="grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
          <LeaveList title="Past" />
          <LeaveList title="Today" />
          <LeaveList title="Upcoming" />
        </div>
      </Card>
    </div>
  )
}

type LeaveListProps = {
  title: string
}
function LeaveList(props: LeaveListProps) {
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
                    {person.name}
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
