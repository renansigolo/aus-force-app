"use client"

import { Button } from "@/components/Button"
import { Fragment, useState } from "react"
import { useForm } from "react-hook-form"

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

export function RatesForm() {
  const {
    register,
    formState: { isSubmitting, isValid },
  } = useForm()

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="mt-6 grid gap-4">
        <div>
          <label htmlFor="clientName">Client Name</label>
          <select id="clientName" {...register("clientName")}>
            <option>Client 01</option>
            <option>Client 02</option>
            <option>Client 03</option>
          </select>
        </div>

        <div>
          <label htmlFor="jobPosition">Job position</label>
          <select id="jobPosition" {...register("jobPosition")}>
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

        <div>
          <DayScheduleForm />
          <hr className="my-6" />
          <HoursWorked />
        </div>
      </div>

      <div className="gap-2 pt-5 sm:flex sm:flex-row-reverse sm:pt-4">
        <Button type="submit" className="btn-success" disabled={isSubmitting || !isValid}>
          Submit
        </Button>
        <Button href="?showModal=false" className="btn-secondary">
          Cancel
        </Button>
      </div>
    </form>
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
