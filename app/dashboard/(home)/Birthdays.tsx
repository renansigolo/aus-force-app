import { DatabaseUser } from "@/app/dashboard/profile/page"
import { Card } from "@/components/Card"
import { getCollectionQuery } from "@/lib/firebase"
import { UserGroupIcon } from "@heroicons/react/24/outline"
import { where } from "firebase/firestore"
import Image from "next/image"

export async function Birthdays() {
  const currentDate = new Date().toISOString().split("T")[0]
  const data: DatabaseUser[] = await getCollectionQuery("users", where("dob", "<", currentDate), 9)
  if (!data.length) return null

  const pastMonths = data.filter((user) => user.dob.split("-")[1] < currentDate.split("-")[1])
  const upcomingMonths = data.filter((user) => user.dob.split("-")[1] >= currentDate.split("-")[1])
  const today = data.filter(
    (user) =>
      user.dob.split("-")[1] === currentDate.split("-")[1] &&
      user.dob.split("-")[2] === currentDate.split("-")[2],
  )

  return (
    <div>
      <h2 className="heading-3 mb-3">Birthdays</h2>
      <Card>
        <div className="grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
          <BirthdaysList title="Past" users={pastMonths} />
          <BirthdaysList title="Today" users={today} />
          <BirthdaysList title="Upcoming" users={upcomingMonths} />
        </div>
      </Card>
    </div>
  )
}

type BirthdaysListProps = {
  title: string
  users: DatabaseUser[]
}
function BirthdaysList(props: BirthdaysListProps) {
  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="flex justify-between text-lg font-semibold leading-8 text-gray-900">
        <ul role="list" className="w-full divide-y divide-gray-100">
          {props.title}
          {props.users.length === 0 ? (
            <EmptyBirthday />
          ) : (
            <>
              {props.users.map((person: DatabaseUser) => (
                <li key={person.uid} className="flex w-full justify-between gap-x-6 px-2 py-5">
                  <div className="flex gap-x-4">
                    <Image
                      width={48}
                      height={48}
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={person.photoURL}
                      alt="User profile image"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="inline-flex align-middle text-sm font-semibold leading-6 text-gray-900">
                        {person.displayName}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {person.role} {/* at {person.company} */}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        <time dateTime={person.dob}>{person.dob}</time>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

function EmptyBirthday() {
  return (
    <div className="grid place-content-center text-center">
      <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">No Birthdays</h2>
      <p className="mt-1 text-sm text-gray-500">No birthdays for this date</p>
    </div>
  )
}
