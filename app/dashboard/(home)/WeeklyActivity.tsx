import { Role } from "@/components/Roles"
import { BanknotesIcon, ClockIcon } from "@heroicons/react/20/solid"
import Link from "next/link"

const cards = [
  {
    name: "Hours Worked",
    href: "/dashboard/worker/shifts",
    icon: ClockIcon,
    amount: "0h",
  },
  {
    name: "Week Payment",
    href: "/dashboard/worker/payments",
    icon: BanknotesIcon,
    amount: "$0,00",
  },
]

export function WeeklyActivity() {
  return (
    <Role role="worker">
      <div>
        <h2 className="heading-3">Weekly Activity</h2>
        <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {cards.map((card) => (
            <div key={card.name} className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">{card.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{card.amount}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link
                    href={card.href}
                    className="font-medium text-indigo-700 hover:text-indigo-900"
                  >
                    View all
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Role>
  )
}
