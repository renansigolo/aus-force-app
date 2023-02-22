import { mockUser } from "@/lib/constants"

const stats = [
  { label: "Vacation days left", value: 12 },
  { label: "Sick days left", value: 4 },
  { label: "Personal days left", value: 2 },
]

export function WelcomePanel() {
  return (
    <section aria-labelledby="profile-overview-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img
                  className="mx-auto h-20 w-20 rounded-full"
                  src={mockUser.photoURL || ""}
                  alt="Profile IMage"
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">
                  Welcome back,
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {mockUser.displayName}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {mockUser.jobTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {stats?.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-5 text-center text-sm font-medium"
            >
              <span className="text-gray-900">{stat.value}</span>{" "}
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
