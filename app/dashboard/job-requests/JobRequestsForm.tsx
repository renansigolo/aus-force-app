"use client"

import { Tab } from "@headlessui/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { twMerge } from "tailwind-merge"

export function JobRequestsForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ shouldUseNativeValidation: true })

  const hideModal = () => router.push("?showModal=false")

  return (
    <form className="my-8 grid grid-cols-1 gap-4">
      <div className="col-span-1">
        <label htmlFor="jobSite" className="form-label">
          Job Site
        </label>
        <select {...register("jobSite")}>
          <option>Job Site A</option>
          <option>Job Site B</option>
        </select>
      </div>

      <div className="col-span-1">
        <label htmlFor="supplier" className="form-label">
          Select Supplier
        </label>
        <select {...register("suplier")}>
          <option>Supplier 01</option>
          <option>Supplier 02</option>
          <option>Supplier 03</option>
        </select>
      </div>

      <Tabs />

      <div className="col-span-1">
        <label htmlFor="additional-notes" className="form-label">
          Additional Notes
        </label>
        <textarea {...register("additionalNotes")} />
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          disabled={isSubmitting || !isValid}
        >
          Submit
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => hideModal()}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function Tabs() {
  return (
    <div className="w-full sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1">
          <Tab
            className={({ selected }) =>
              twMerge(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-indigo-50 hover:bg-white/[0.12] hover:text-white",
              )
            }
          >
            Worker
          </Tab>
          <Tab
            className={({ selected }) =>
              twMerge(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-indigo-50 hover:bg-white/[0.12] hover:text-white",
              )
            }
          >
            Service
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-2">
          <Tab.Panel className="grid grid-cols-1 gap-4">
            <WorkerFields />
          </Tab.Panel>
          <Tab.Panel className="grid grid-cols-1 gap-4">
            <ServiceFields />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

function WorkerFields() {
  return (
    <>
      <div className="col-span-1">
        <label htmlFor="jobPosition" className="form-label">
          Job Position
        </label>
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
          <option>Other</option>
        </select>
      </div>

      <div className="col-span-1">
        {/* If the selection of job position is Other */}
        <label htmlFor="quantity" className="form-label">
          Job Position
        </label>
        <input type="text" name="jobPosition" id="jobPosition" />
      </div>

      <div className="col-span-1">
        <label htmlFor="quantity" className="form-label">
          Quantity
        </label>
        <input type="number" name="quantity" id="quantity" />
      </div>

      <div className="col-span-1">
        <label htmlFor="start-datetime" className="form-label">
          Start Time
        </label>

        <input type="datetime-local" name="start-datetime" id="start-datetime" />
      </div>
      <div className="col-span-1">
        <label htmlFor="end-datetime" className="form-label">
          End Time
        </label>
        <input type="datetime-local" name="end-datetime" id="end-datetime" />
      </div>

      <div className="col-span-1">
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="break"
              aria-describedby="break-description"
              name="break"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="break" className="font-medium text-gray-700">
              Break?
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

function ServiceFields() {
  return (
    <>
      <div className="col-span-1">
        <label htmlFor="service" className="form-label">
          Service Description
        </label>
        <input type="text" name="service" id="service" />
      </div>
      <div className="col-span-1">
        <label htmlFor="quantity" className="form-label">
          Quantity
        </label>
        <input type="number" name="quantity" id="quantity" />
      </div>
      <div className="col-span-1">
        <label htmlFor="start-datetime" className="form-label">
          Start Time
        </label>
        <input type="datetime-local" name="start-datetime" id="start-datetime" />
      </div>
    </>
  )
}
