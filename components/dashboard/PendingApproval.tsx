"use client"

import { Card } from "@/components/Card"
import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import NiceModal from "@ebay/nice-modal-react"
import {
  BuildingOffice2Icon,
  ClockIcon,
  MapIcon,
} from "@heroicons/react/20/solid"

const item = {
  name: "Today",
  company: "ACR",
  address: "377/12 Church Avenue",
  time: "7am - 3pm",
}

export function PendingApproval() {
  const showModal = () =>
    NiceModal.show(Modal, {
      title: "Review Shift",
      description: "Please review the details and confirm your shift.",
      children: <ShiftApprovalModal />,
    })

  return (
    <Role role="client">
      <h2 className="heading-3 mb-3">Waiting Approval</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card buttonAction={showModal}>
          <div key={item.name}>
            <dt className="text-lg font-semibold leading-8 text-gray-900">
              {item.name}
            </dt>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li className="flex gap-x-3">
                <BuildingOffice2Icon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {item.company}
              </li>
              <li className="flex gap-x-3">
                <MapIcon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {item.address}
              </li>
              <li className="flex gap-x-3">
                <ClockIcon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {item.time}
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </Role>
  )
}

function ShiftApprovalModal() {
  return (
    <>
      <form className="my-12 space-y-8 divide-y divide-gray-200">
        <div className="mt-6 grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <label
              htmlFor="site-name"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <div className="mt-1">
              <input required id="site-name" name="site-name" type="text" />
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Job site
            </label>
            <div className="mt-1">
              <select id="role" name="role">
                <option>Site 01</option>
                <option>Site 02</option>
              </select>
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="start-datetime"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <div className="mt-1">
              <input
                type="datetime-local"
                name="start-datetime"
                id="start-datetime"
              />
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="end-datetime"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <div className="mt-1">
              <input
                type="datetime-local"
                name="end-datetime"
                id="end-datetime"
              />
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Break (in minutes)
            </label>
            <input type="number" name="break" id="break" step="15" />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Normal Hours
            </label>
            <input
              type="number"
              name="normalHours"
              id="normalHours"
              step="0.5"
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Overtime Hours
            </label>
            <input
              type="number"
              name="overtimeHours"
              id="overtimeHours"
              step="0.5"
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="additional-notes"
              className="block text-sm font-medium text-gray-700"
            >
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
