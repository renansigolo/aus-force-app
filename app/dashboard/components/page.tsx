"use client"

import { FocusEvent } from "react"
import { useFieldArray, useForm } from "react-hook-form"

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

const DynamicForm = () => {
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
      alert("End hour must be greater than start hour.")
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
      alert("Total hours for the day cannot exceed 24.")
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
    if (validateForm()) {
      console.log(data)
    } else {
      console.log(data)
      alert("Each day must have time ranges totaling exactly 24 hours.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {daysOfWeek.map((day, dayIndex) => (
        <div key={day}>
          <h3>{day}</h3>
          {weekFieldArrays[dayIndex].fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <input
                type="number"
                {...register(`week.${day}.${index}.startHour`)}
                readOnly
                className="input-class" // Tailwind CSS class
              />
              <input
                type="number"
                {...register(`week.${day}.${index}.endHour`)}
                className="input-class" // Tailwind CSS class
                onBlur={(e) => handleEndHourChange(dayIndex, index, e)}
              />
              <input
                type="number"
                {...register(`week.${day}.${index}.baseRate`)}
                defaultValue={0}
                placeholder="Base Rate"
                className="input-class" // Tailwind CSS class
              />
              <button
                type="button"
                onClick={() => weekFieldArrays[dayIndex].remove(index)}
                className="remove-button-class" // Tailwind CSS class
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ))}
      <input type="submit" className="submit-button-class" />
    </form>
  )
}

export default DynamicForm
