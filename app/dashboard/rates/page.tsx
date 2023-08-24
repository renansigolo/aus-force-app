"use client"

import { Accordion } from "@/components/Accordion"
import { Empty } from "@/components/Empty"
import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import NiceModal from "@ebay/nice-modal-react"
import { Dialog, Transition } from "@headlessui/react"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Fragment, useRef, useState } from "react"

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

const hoursWorkedData = [
  {
    startTime: 0,
    endTime: 8,
    rateMultiplier: 1,
  },
  {
    startTime: "",
    endTime: "",
    rateMultiplier: "",
  },
]

const accordionItemsDefault = [
  {
    title: "General Labour",
    children: <RatesList />,
  },
  {
    title: "Traffic Controller",
    children: <RatesList />,
  },
  {
    title: "Forklift Driver",
    children: <RatesList />,
  },
]

export default function RatesPage() {
  const showModal = () =>
    NiceModal.show(Modal, {
      title: "New Rates",
      children: <AddNewRatesModal />,
    })

  return (
    <SectionWrapper>
      <Role role="business">
        <SectionHeading title="Rates" buttonLabel="Add New Rates" buttonAction={showModal} />
        <section className="py-8">
          <Empty title="rates" />
        </section>

        <section className="py-8">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            {/* Heading */}
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-2">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Client 01</h3>
                </div>
              </div>
            </div>

            <div className="px-4 py-5 sm:p-6">
              {/* Content */}
              <Accordion items={accordionItemsDefault} />
            </div>
          </div>
        </section>
      </Role>
    </SectionWrapper>
  )
}

export function AddNewRatesModal() {
  return (
    <>
      <form className="my-12 space-y-8 divide-y divide-gray-200">
        <div className="mt-6 grid gap-4">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <div className="mt-1">
              <select
                id="clientName"
                name="clientName"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option>Client 01</option>
                <option>Client 02</option>
                <option>Client 03</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700">
              Job position
            </label>
            <div className="mt-1">
              <select id="jobPosition" name="jobPosition">
                <option>General Labour</option>
                <option>Skill Labour</option>
                <option>Traffic Controller</option>
                <option>Forklift Operator</option>
                <option>LO Operator</option>
                <option>Picker/Packer</option>
                <option>Dogman</option>
                <option>Crane Operator</option>
                <option>Rigger</option>
                <option>Escavator Operator</option>
                <option>Trade Assistant</option>
                <option>Carpenter</option>
                <option>Steel Fixer</option>
                <option>Formworker</option>
                <option>Manitou Operator</option>
              </select>
            </div>
          </div>

          <div>
            <DayScheduleForm />
            <hr className="my-6" />
            <HoursWorked />
          </div>
        </div>
      </form>
    </>
  )
}

function ConfirmationModal() {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Deactivate account
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be
                        permanently removed from our servers forever. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    ref={cancelButtonRef}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function DayScheduleForm() {
  const [days, setDays] = useState([
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
  ])

  const handleDayChange = (index: number, field: string, value: string) => {
    setDays((prevDays) =>
      prevDays.map((day, i) => (i === index ? { ...day, [field]: value } : day)),
    )
  }

  return (
    <div>
      <div className="pb-4">
        <h2 className="heading-3">Daily Rate</h2>
        <p className="mt-1 text-sm text-gray-500">
          You must set a rate for the range of 24h per day
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="font-bold">Day</div>
        <div className="font-bold">Start Time</div>
        <div className="font-bold">End Time</div>
        <div className="font-bold">Base rate</div>
        {days.map((day, index) => (
          <Fragment key={index}>
            <div>{day.day}</div>
            <input
              type="time"
              value={day.startTime}
              onChange={(e) => handleDayChange(index, "startTime", e.target.value)}
            />
            <input
              type="time"
              value={day.endTime}
              onChange={(e) => handleDayChange(index, "endTime", e.target.value)}
            />
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0"
                aria-describedby="price-currency"
                value={day.price}
                onChange={(e) => handleDayChange(index, "price", e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  AUD
                </span>
              </div>
            </div>
            <div></div>
            <input
              type="time"
              value={day.startTime}
              onChange={(e) => handleDayChange(index, "startTime", e.target.value)}
            />
            <input
              type="time"
              value={day.endTime}
              onChange={(e) => handleDayChange(index, "endTime", e.target.value)}
            />
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0"
                aria-describedby="price-currency"
                value={day.price}
                onChange={(e) => handleDayChange(index, "price", e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  AUD
                </span>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function HoursWorked() {
  const [items, setItems] = useState(hoursWorkedData)

  const handleItemChange = (index: number, field: string, value: string) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    )
  }

  return (
    <div>
      <div className="pb-4">
        <h2 className="heading-3">Rate per range of hours worked</h2>
        <p className="mt-1 text-sm text-gray-500">You must complete the range of 24h</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="font-bold">Range of worked hours</div>
        <div className="font-bold"></div>
        <div className="font-bold">Rate Multiplier</div>
        {items.map((item, index) => (
          <Fragment key={index}>
            <input
              type="number"
              value={item.startTime}
              min={0}
              max={24}
              placeholder="Begin at"
              onChange={(e) => handleItemChange(index, "startTime", e.target.value)}
            />
            <input
              type="number"
              value={item.endTime}
              min={0}
              max={24}
              placeholder="End at"
              onChange={(e) => handleItemChange(index, "endTime", e.target.value)}
            />
            <input
              type="number"
              value={item.rateMultiplier}
              min={1}
              placeholder="x1.5"
              onChange={(e) => handleItemChange(index, "rateMultiplier", e.target.value)}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function RatesList() {
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

// const people = [
//   {
//     name: "Monday",
//     title: "00:00",
//     email: "11:11",
//     role: "$100 AUD",
//   },
//   {
//     name: "Tuesday",
//     title: "Front-end Developer",
//     email: "lindsay.walton@example.com",
//     role: "$200 AUD",
//   },

// ]

// function Table() {
//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
//           <p className="mt-2 text-sm text-gray-700">
//             A list of all the users in your account including their name, title, email and role.
//           </p>
//         </div>
//         <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
//           <button
//             type="button"
//             className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Add user
//           </button>
//         </div>
//       </div>
//       <div className="-mx-4 mt-8 sm:-mx-0">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead>
//             <tr>
//               <th
//                 scope="col"
//                 className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
//               >
//                 Day
//               </th>
//               <th
//                 scope="col"
//                 className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
//               >
//                 Start Time
//               </th>
//               <th
//                 scope="col"
//                 className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
//               >
//                 End Time
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Price
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {people.map((person) => (
//               <tr key={person.email}>
//                 <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
//                   {person.name}
//                   <dl className="font-normal lg:hidden">
//                     <dt className="sr-only">Title</dt>
//                     <dd className="mt-1 truncate text-gray-700">Start Time: {person.title}</dd>
//                     <dt className="sr-only sm:hidden">Email</dt>
//                     <dd className="mt-1 truncate text-gray-500 sm:hidden">{person.email}</dd>
//                   </dl>
//                 </td>
//                 <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
//                   {person.title}
//                 </td>
//                 <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
//                   {person.email}
//                 </td>
//                 <td className="px-3 py-4 text-sm text-gray-500">{person.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }
