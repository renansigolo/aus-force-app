"use client"

import { Button } from "@/components/Button"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { FocusEvent, Fragment, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"

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
  const router = useRouter()
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm()

  const onSubmit = () => {
    router.push("?showModalRates=false")
    toast.error("Rates not saved. This is just a demo.")
  }

  return (
    <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-6 grid gap-4">
        <>
          <DayScheduleForm />

          <hr className="my-6" />

          <HoursWorked />
        </>
      </div>

      <div className="pt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          disabled={isSubmitting || !isValid}
        >
          Submit
        </button>
        <Button href="?showModalRates=false" className="btn-secondary" disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

type Range = {
  startHour: number
  endHour: number
  baseRate: number
}
type Week = {
  [key: string]: Range[]
}
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const
type DaysOfWeek = typeof daysOfWeek
function DayScheduleForm() {
  const defaultValues: Week = daysOfWeek.reduce(
    (acc, day) => ({ ...acc, [day]: [{ startHour: 0, endHour: "", baseRate: 0 }] }) as Week,
    {} as Week,
  )

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Week>({
    defaultValues: { week: defaultValues as any },
  })

  const weekFieldArrays = daysOfWeek.map((day) =>
    // eslint-disable-next-line
    useFieldArray({
      control,
      name: `week.${day}`,
    }),
  )

  const calculateTotalHours = (day: DaysOfWeek) => {
    const dayFields: any = getValues(`week.${day}`)
    return dayFields.reduce((total: number, current: any) => {
      return total + (current.endHour - current.startHour)
    }, 0)
  }

  const validateForm = () => {
    return daysOfWeek.every((day) => calculateTotalHours(day as any) === 24)
  }

  const validateEndHour = (dayIndex: number, index: number) => {
    const dayFields: any = getValues(`week.${daysOfWeek[dayIndex]}`)
    const currentField = dayFields[index]
    if (currentField.endHour <= currentField.startHour) {
      toast.error("End hour must be greater than start hour.")
      return false
    }

    const totalHours = dayFields.reduce((total: number, field: any, idx: number) => {
      if (idx <= index) {
        const rangeHours = field.endHour - field.startHour
        return total + (rangeHours > 0 ? rangeHours : 0)
      }
      return total
    }, 0)

    if (totalHours > 24) {
      toast.error("Total hours for the day cannot exceed 24.")
      return false
    }

    if (index === dayFields.length - 1 && totalHours < 24) {
      weekFieldArrays[dayIndex].append({ startHour: currentField.endHour, endHour: "" })
    }

    return true
  }

  const handleEndHourChange = (
    dayIndex: number,
    index: number,
    e: FocusEvent<HTMLInputElement, Element>,
  ) => {
    const value = parseInt(e.target.value)
    setValue(`week.${daysOfWeek[dayIndex]}.${index}.endHour`, value as never)
    validateEndHour(dayIndex, index)
  }

  const onSubmit = (data: any) => {
    console.log(data)
    validateForm()
      ? toast.success("Rates saved.")
      : toast.error("Each day must have time ranges totaling exactly 24 hours.")
  }

  return (
    <div>
      <div className="pb-4">
        <h2 className="heading-3">Daily Rate</h2>
        <p className="mt-1 text-sm text-gray-500">
          You must set a rate for the range of 24h per day
        </p>
      </div>

      <form>
        {daysOfWeek.map((day, dayIndex) => (
          <div key={day}>
            <h3>{day}</h3>

            {weekFieldArrays[dayIndex].fields.map((field, index) => (
              <div key={field.id} className="flex h-12 items-center gap-2">
                <input
                  type="number"
                  placeholder="Start Hour"
                  {...register(`week.${day}.${index}.startHour`)}
                  readOnly
                  className="form-input"
                />

                <input
                  type="number"
                  placeholder="End Hour"
                  {...register(`week.${day}.${index}.endHour`, { max: 24 })}
                  onBlur={(e) => handleEndHourChange(dayIndex, index, e)}
                  className="form-input"
                />

                <div className="relative h-9 min-w-[120px] rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    {...register(`week.${day}.${index}.baseRate`)}
                    defaultValue={0}
                    placeholder="Base Rate"
                    className="block h-full w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                      AUD
                    </span>
                  </div>
                </div>

                {index > 0 ? (
                  <Button type="button" onClick={() => weekFieldArrays[dayIndex].remove(index)}>
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                ) : (
                  <div className="min-w-[50px]"></div>
                )}
              </div>
            ))}
          </div>
        ))}

        <Button type="button" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </form>
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
