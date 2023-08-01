"use client"

import { Empty } from "@/components/Empty"
import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import NiceModal from "@ebay/nice-modal-react"
import { Dialog, Transition } from "@headlessui/react"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Fragment, useRef, useState } from "react"

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
              <p>TBD</p>
            </div>
          </div>
        </section>
      </Role>
    </SectionWrapper>
  )
}

function AddNewRatesModal() {
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
        <div className="font-bold">Price</div>
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
          </Fragment>
        ))}
      </div>
    </div>
  )
}

const HoursWorked = () => {
  const [items, setItems] = useState([
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
  ])

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
