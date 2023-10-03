import { RequestLeaveData } from "@/app/dashboard/[role]/(worker)/leave-requests/page"
import { Card } from "@/components/Card"
import { getCollection } from "@/lib/firebase"
import { SunIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

export async function Leaves() {
  const currentDate = new Date().toISOString().split("T")[0]
  const data = await getCollection<RequestLeaveData>("leaveRequests")
  if (!data.length) return null

  const pastMonths = data.filter(
    (leave) => leave.startDate.split("-")[1] < currentDate.split("-")[1],
  )
  const upcomingMonths = data.filter(
    (leave) => leave.startDate.split("-")[1] >= currentDate.split("-")[1],
  )
  const today = data.filter(
    (leave) =>
      leave.startDate.split("-")[1] === currentDate.split("-")[1] &&
      leave.startDate.split("-")[2] === currentDate.split("-")[2],
  )
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
        <div className="grid grid-cols-1 divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          <LeaveList title="Past" items={pastMonths} />
          <LeaveList title="Today" items={today} />
          <LeaveList title="Upcoming" items={upcomingMonths} />
        </div>
      </Card>
    </div>
  )
}

type LeaveListProps = {
  title: string
  items: RequestLeaveData[]
}
function LeaveList(props: LeaveListProps) {
  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="flex justify-between text-lg font-semibold leading-8 text-gray-900">
        <ul
          role="list"
          className="w-full divide-y divide-gray-100"
          style={{ overflowWrap: "anywhere" }}
        >
          {props.title}
          {props.items.length === 0 ? (
            <EmptySlot />
          ) : (
            props.items.map((item) => (
              <li key={item.id} className="flex w-full justify-between gap-x-6 px-2 py-5">
                <div className="flex gap-x-4">
                  <Image
                    width={48}
                    height={48}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={"/images/profile-placeholder.png"}
                    alt="User profile image"
                  />
                  <div className="flex-wrap">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {item.requestedBy}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {item.reason} | {item.status}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      <time dateTime={item.startDate}>From: {item.startDate}</time>
                      <br />
                      <time dateTime={item.endDate}>To: {item.endDate}</time>
                    </p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

function EmptySlot() {
  return (
    <div className="grid place-content-center text-center">
      <SunIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">No Leaves</h2>
      <p className="mt-1 text-sm text-gray-500">No leaves for this date</p>
    </div>
  )
}
