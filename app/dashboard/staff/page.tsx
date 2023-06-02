"use client"

import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"
import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import NiceModal from "@ebay/nice-modal-react"

export default function StaffPage() {
  const showModal = () =>
    NiceModal.show(Modal, {
      title: "New Staff",
      children: <StaffContent />,
    })

  return (
    <SectionWrapper>
      <Role role="client">
        <SectionHeading
          title="Staff"
          buttonLabel="New Staff"
          buttonAction={showModal}
        />
        <section className="py-8">
          <Empty title="staff" />
        </section>
      </Role>
    </SectionWrapper>
  )
}

function StaffContent() {
  return (
    <>
      <form className="my-12 space-y-8 divide-y divide-gray-200">
        <div className="mt-6 grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                required
                id="email"
                name="email"
                type="email"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
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
              htmlFor="job-site"
              className="block text-sm font-medium text-gray-700"
            >
              Job Site
            </label>
            <div className="mt-1">
              <select id="job-site" name="job-site">
                <option>Site 1</option>
                <option>Site 2</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
