import { ClientData } from "@/app/dashboard/[role]/(business)/clients/ClientsList"
import { Accordion, AccordionItem } from "@/components/Accordion"
import { Button } from "@/components/Button"
import { Card, CardContent, CardHeader } from "@/components/Card"
import { Empty } from "@/components/Empty"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

const ratesData = [
  {
    day: "Monday",
    startTime: "",
    endTime: "",
    price: "",
  },
  {
    day: "Tuesday",
    startTime: "",
    endTime: "",
    price: "",
  },
  {
    day: "Wednesday",
    startTime: "",
    endTime: "",
    price: "",
  },
  {
    day: "Thursday",
    startTime: "",
    endTime: "",
    price: "",
  },
  {
    day: "Friday",
    startTime: "",
    endTime: "",
    price: "",
  },
  {
    day: "Saturday",
    startTime: "",
    endTime: "",
    price: "",
  },
  {
    day: "Sunday",
    startTime: "",
    endTime: "",
    price: "",
  },
]

const accordionItems: AccordionItem[] = []
// const accordionItems = [
//   {
//     title: "General Labour",
//     children: <RatesClients />,
//   },
//   {
//     title: "Traffic Controller",
//     children: <RatesClients />,
//   },
//   {
//     title: "Forklift Driver",
//     children: <RatesClients />,
//   },
// ]

type RatesListProps = {
  data: ClientData[]
}

export async function RatesList({ data }: RatesListProps) {
  return data.map((item) => <ClientCard key={item.id} client={item} />)
}

function ClientCard({ client }: { client: ClientData }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium leading-6 text-gray-900">{client.name}</h3>

        <Button href="?showModal=true" className="btn-secondary">
          <PencilSquareIcon className="h-6 w-6 text-indigo-600 hover:text-indigo-500" />
        </Button>
      </CardHeader>

      <CardContent>
        {accordionItems.length === 0 ? (
          <Empty title="job for this client" />
        ) : (
          <Accordion items={accordionItems} />
        )}
      </CardContent>
    </Card>
  )
}

export function RatesClients() {
  return (
    <div className="mt-6 border-t border-gray-100">
      <dl className="divide-y divide-gray-100">
        {ratesData.map((item, index) => (
          <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="col-span-1 text-sm font-medium leading-6 text-gray-900">{item.day}</dt>
            <dd className="col-span-2 grid grid-cols-3">
              <div>
                <div className="mt-1 text-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Start Time
                </div>
                <div className="flex flex-col justify-center">
                  <div className="inline-flex justify-center border-b border-gray-300">
                    {item.startTime || "00:00"}
                  </div>
                  <div className="inline-flex justify-center border-b border-gray-300">
                    {item.startTime || "00:00"}
                  </div>
                  <div className="inline-flex justify-center">{item.startTime || "00:00"}</div>
                </div>
              </div>

              <div>
                <div className="mt-1 text-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  End Time
                </div>
                <div className="flex flex-col justify-center">
                  <div className="inline-flex justify-center border-b border-gray-300">
                    {item.startTime || "00:00"}
                  </div>
                  <div className="inline-flex justify-center border-b border-gray-300">
                    {item.startTime || "00:00"}
                  </div>
                  <div className="inline-flex justify-center">{item.startTime || "00:00"}</div>
                </div>
              </div>

              <div>
                <div className="mt-1 text-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Base Rate
                </div>
                <div className="flex flex-col justify-center text-center">
                  <div className="inline-flex justify-center border-b border-gray-300">
                    {item.price || "$100.00"}
                  </div>
                  <div className="inline-flex justify-center border-b border-gray-300">
                    {item.price || "$200.00"}
                  </div>
                  <div className="inline-flex justify-center">{item.price || "$300.00"}</div>
                </div>
              </div>
            </dd>
          </div>
        ))}

        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Rates per hour worked</dt>
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
              <li className="py-4 pl-4 pr-5 text-sm leading-6">
                <div className="grid grid-cols-2">
                  <div>
                    <div className="mt-1 text-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      Range of hours
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="inline-flex justify-center border-b border-gray-300">
                        0 - 8
                      </div>
                      <div className="inline-flex justify-center border-b border-gray-300">
                        9 -18
                      </div>
                      <div className="inline-flex justify-center">19 - 24</div>
                    </div>
                  </div>

                  <div>
                    <div className="mt-1 text-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      Multiplier
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="inline-flex justify-center border-b border-gray-300">
                        (base rate) x 1.5
                      </div>
                      <div className="inline-flex justify-center border-b border-gray-300">
                        (base rate) x 2
                      </div>
                      <div className="inline-flex justify-center">(base rate) x 3</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  )
}
