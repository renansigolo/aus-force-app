"use client"

import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"
import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import NiceModal from "@ebay/nice-modal-react"

export default function JobRequestsPage() {
  const showModal = () =>
    NiceModal.show(Modal, {
      title: "New Job",
      children: <JobRequestsContent />,
    })

  return (
    <SectionWrapper>
      <Role role="client">
        <SectionHeading
          title="Job Requests"
          buttonLabel="New Job"
          buttonAction={showModal}
        />
        <section className="py-8">
          <Empty title="job requests" />
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
            <label
              htmlFor="site-name"
              className="block text-sm font-medium text-gray-700"
            >
              Job Site
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
              Job position
            </label>
            <div className="mt-1">
              <select id="role" name="role">
                <option>Supervisor</option>
                <option>Manager</option>
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

          <div className="col-span-1">
            <label
              htmlFor="supplier"
              className="block text-sm font-medium text-gray-700"
            >
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
        </div>
      </form>
    </>
  )
}
