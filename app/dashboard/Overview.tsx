const stats = [
  {
    name: "Ongoing Position",
    stat: "@ ACR",
    previousStat: "70,946",
    address: "377/12 Church Avenue",
    time: "7am to 3pm",
  },
  {
    name: "Until 03 March",
    stat: "@ CAPA",
    previousStat: "56.14%",
    address: "333 George St",
    time: "8am to 4pm",
  },
  {
    name: "Tomorrow",
    stat: "@ NSAC",
    previousStat: "28.62%",
    address: "6 Mackenzie St.",
    time: "9am to 5pm",
  },
]

export function Overview() {
  return (
    <div>
      <h2 className="heading-3">Overview</h2>
      <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-xl text-gray-900 text-center font-semibold mb-4">
              {item.name}
            </dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-xl font-semibold text-indigo-600">
                {item.stat}
              </div>
            </dd>

            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline">
                <span className="text-lg font-semibold text-indigo-600 mr-1">
                  Address:
                </span>
                {item.time}
              </div>
            </dd>

            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline">
                <span className="text-lg font-semibold text-indigo-600 mr-1">
                  Time:
                </span>
                {item.time}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
