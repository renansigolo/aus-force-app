"use client"

import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"
import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import { cn } from "@/lib/helpers"
import NiceModal from "@ebay/nice-modal-react"
import { Tab } from "@headlessui/react"
import { ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/outline"

const items = [
  {
    title: "Job Request 1",
    jobPosition: "General Labour",
    startTime: new Date().toDateString(),
    endTime: new Date().toDateString(),
    break: true,
    additionalNotes: "lorem ipsum dolor sit amet",
    supplier: "Supplier A",
  },
  {
    title: "Job Request 2",
    jobPosition: "Traffic Controller",
    startTime: new Date().toDateString(),
    endTime: new Date().toDateString(),
    break: false,
    additionalNotes: "lorem ipsum dolor sit amet",
    supplier: "Supplier B",
  },
  {
    title: "Job Request 3",
    jobPosition: "LO Operator",
    startTime: new Date().toDateString(),
    endTime: new Date().toDateString(),
    break: true,
    additionalNotes: "lorem ipsum dolor sit amet",
    supplier: "Supplier C",
  },
]

export default function JobRequestsPage() {
  const showModal = () =>
    NiceModal.show(Modal, {
      title: "New Job",
      children: <JobRequestsContent />,
    })

  return (
    <SectionWrapper>
      <Role role="client">
        <SectionHeading title="Job Requests" buttonLabel="New Job" buttonAction={showModal} />
        <section className="py-8">
          <Empty title="job requests" />
        </section>

        <section className="py-8">
          <JobRequestList />
        </section>
      </Role>
    </SectionWrapper>
  )
}

function JobRequestsContent() {
  return (
    <>
      <form className="my-12 space-y-8 divide-y divide-gray-200">
        <div className="mt-6 grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <label htmlFor="jobSite" className="block text-sm font-medium text-gray-700">
              Job Site
            </label>
            <div className="mt-1">
              <select id="jobSite" name="jobSite">
                <option>Job Site A</option>
                <option>Job Site B</option>
              </select>
            </div>
          </div>
          <div className="col-span-1">
            <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
              Select Supplier
            </label>
            <div className="mt-1">
              <select id="supplier" name="supplier">
                <option>Supplier 01</option>
                <option>Supplier 02</option>
                <option>Supplier 03</option>
              </select>
            </div>
          </div>

          <Tabs />

          <div className="col-span-1">
            <label htmlFor="additional-notes" className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <div className="mt-1">
              <textarea id="additional-notes" name="additional-notes" />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

function JobRequestList() {
  return (
    <div className="grid grid-cols-1 gap-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm"
        >
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{item.title}</p>
            <p className="text-sm text-gray-500">{item.jobPosition}</p>
            <p className="text-sm text-gray-500">
              {item.startTime} - {item.endTime}
            </p>
            <p className="text-sm text-gray-500">{item.break ? "With" : "No"} Break</p>
            <p className="text-sm text-gray-500">{item.additionalNotes}</p>
            <p className="text-sm text-gray-500">{item.supplier}</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-md bg-yellow-50 px-2 py-1 text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              <ExclamationTriangleIcon className="h-6 w-6" /> Waiting Allocation
            </span>
            <button type="button" className="btn gap-2">
              <XCircleIcon className="h-6 w-6" /> Cancel Request
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function Tabs() {
  return (
    <div className="w-full sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1">
          <Tab
            className={({ selected }) =>
              cn(
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
              cn(
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
        <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700">
          Job Position
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
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="col-span-1">
        {/* If the selection of job position is Other */}
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Job Position
        </label>
        <div className="mt-1">
          <input type="text" name="jobPosition" id="jobPosition" />
        </div>
      </div>
      <div className="col-span-1">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <div className="mt-1">
          <input type="number" name="quantity" id="quantity" />
        </div>
      </div>
      <div className="col-span-1">
        <label htmlFor="start-datetime" className="block text-sm font-medium text-gray-700">
          Start Time
        </label>
        <div className="mt-1">
          <input type="datetime-local" name="start-datetime" id="start-datetime" />
        </div>
      </div>
      <div className="col-span-1">
        <label htmlFor="end-datetime" className="block text-sm font-medium text-gray-700">
          End Time
        </label>
        <div className="mt-1">
          <input type="datetime-local" name="end-datetime" id="end-datetime" />
        </div>
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
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">
          Service Description
        </label>
        <div className="mt-1">
          <input type="text" name="service" id="service" />
        </div>
      </div>
      <div className="col-span-1">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <div className="mt-1">
          <input type="number" name="quantity" id="quantity" />
        </div>
      </div>
      <div className="col-span-1">
        <label htmlFor="start-datetime" className="block text-sm font-medium text-gray-700">
          Start Time
        </label>
        <div className="mt-1">
          <input type="datetime-local" name="start-datetime" id="start-datetime" />
        </div>
      </div>
    </>
  )
}
