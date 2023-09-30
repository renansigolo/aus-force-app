"use client"

import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import NiceModal from "@ebay/nice-modal-react"
import {
  BuildingOffice2Icon,
  ClockIcon,
  DocumentTextIcon,
  MapIcon,
} from "@heroicons/react/24/outline"

const stats = [
  {
    name: "Today",
    company: "ACR",
    address: "377/12 Church Avenue",
    time: "7am - 3pm",
    policies: "View Policies and Procedures",
  },
  {
    name: "Tomorrow",
    company: "NSAC",
    address: "6 Mackenzie St.",
    time: "9am - 5pm",
    policies: "View Policies and Procedures",
  },
  {
    name: "Until 03 March",
    company: "CAPA",
    address: "333 George St",
    time: "8am - 4pm",
    policies: "View Policies and Procedures",
  },
]

export function Overview() {
  const showModal = () => {
    NiceModal.show(Modal, {
      title: "Review Shift",
      description: "Please review the details and confirm your shift.",
      children: <ShiftApprovalModal />,
    })
  }
  return (
    <div>
      <h2 className="heading-3 mb-3">Overview</h2>
      <Role role="worker">
        <dl className="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((item, index) => (
            <div key={item.name} className="px-4 py-5 sm:p-6">
              <dt className="flex justify-between text-lg font-semibold leading-8 text-gray-900">
                {item.name}
                {index === 0 && (
                  <button type="button" className="btn" onClick={showModal}>
                    Submit Shit
                  </button>
                )}
              </dt>

              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <BuildingOffice2Icon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {item.company}
                </li>
                <li className="flex gap-x-3">
                  <MapIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {item.address}
                </li>
                <li className="flex gap-x-3">
                  <ClockIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {item.time}
                </li>
                <li className="flex gap-x-3">
                  <DocumentTextIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {item.policies}
                </li>
              </ul>
            </div>
          ))}
        </dl>
      </Role>
    </div>
  )
}

function ShiftApprovalModal() {
  return (
    <>
      <form className="my-12 space-y-8 divide-y divide-gray-200">
        <div className="mt-6 grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <label htmlFor="site-name">Company</label>
            <input required id="site-name" name="site-name" type="text" />
          </div>

          <div className="col-span-1">
            <label htmlFor="role">Job site</label>
            <select id="role" name="role">
              <option>Site 01</option>
              <option>Site 02</option>
            </select>
          </div>

          <div className="col-span-1">
            <label htmlFor="start-datetime">Start Time</label>
            <input type="datetime-local" name="start-datetime" id="start-datetime" />
          </div>

          <div className="col-span-1">
            <label htmlFor="end-datetime">End Time</label>
            <input type="datetime-local" name="end-datetime" id="end-datetime" />
          </div>

          <div className="col-span-1">
            <label htmlFor="role">Break (in minutes)</label>
            <input type="number" name="break" id="break" step="15" />
          </div>

          <div className="col-span-1">
            <label htmlFor="role">Normal Hours</label>
            <input type="number" name="normalHours" id="normalHours" step="0.5" />
          </div>

          <div className="col-span-1">
            <label htmlFor="role">Overtime Hours</label>
            <input type="number" name="overtimeHours" id="overtimeHours" step="0.5" />
          </div>

          <div className="col-span-1">
            <label htmlFor="additional-notes">Additional Notes</label>
            <textarea id="additional-notes" name="additional-notes" />
          </div>
        </div>
      </form>
    </>
  )
}
