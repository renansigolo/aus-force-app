"use client"

import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"
import Modal from "@/components/Modal"
import { Role } from "@/components/Roles"
import { useModal } from "@ebay/nice-modal-react"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { useForm, UseFormReturn } from "react-hook-form"

type StaffListDataProps = {
  email: string
  role: "Supervisor" | "Manager"
}

type AccordionProps = {
  title: string
  staff: StaffListDataProps[]
}
const accordionData: AccordionProps[] = [
  {
    title: "Job Site A",
    staff: [
      { email: "vini@outlook.com", role: "Manager" },
      { email: "renan@gmail.com", role: "Supervisor" },
      { email: "fabi@gmail.com", role: "Supervisor" },
    ],
  },
  {
    title: "Job Site B",
    staff: [
      { email: "vini@outlook.com", role: "Manager" },
      { email: "renan@gmail.com", role: "Supervisor" },
      { email: "fabi@gmail.com", role: "Supervisor" },
    ],
  },
  {
    title: "Job Site C",
    staff: [
      { email: "vini@outlook.com", role: "Manager" },
      { email: "renan@gmail.com", role: "Supervisor" },
      { email: "fabi@gmail.com", role: "Supervisor" },
    ],
  },
]

export default function StaffPage() {
  const form = useForm<Inputs>()

  const modal = useModal(Modal)
  const showModal = () =>
    modal
      .show({
        title: "New Staff",
        children: <StaffModal {...form} />,
      })
      .then((modalResponse: any) => {
        if (modalResponse.resolved && form.formState.isValid) {
          const formValues = form.getValues()
          accordionData.push({
            ...accordionData,
            title: formValues.jobSite,
            staff: [
              {
                email: formValues.email,
                role: formValues.role,
              },
            ],
          })
        } else {
          throw new Error("Form is invalid")
        }
      })
      .then(() => {
        form.reset()
        modal.remove()
      })

  return (
    <>
      <SectionWrapper>
        <Role role="client">
          <SectionHeading title="Staff" buttonLabel="New Staff" buttonAction={() => showModal()} />

          <section className="py-8">
            <Empty title="staff" />
          </section>

          <section className="py-8">
            <Accordion />
          </section>
        </Role>
      </SectionWrapper>
    </>
  )
}

function Accordion() {
  return (
    <>
      {accordionData.map((item) => (
        <div key={item.title} className="mb-2 rounded-lg bg-white shadow">
          <div className="mx-auto px-2 pb-6">
            <div className="mx-auto divide-gray-900/10">
              <dl className="space-y-6 divide-y divide-gray-900/10">
                <Disclosure as="div" className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-center justify-between text-left text-gray-900">
                          <span className="flex h-7 items-center">
                            {open ? (
                              <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
                            ) : (
                              <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
                            )}
                            <span className="ml-2 text-base font-semibold leading-7">
                              {item.title}
                            </span>
                          </span>
                        </Disclosure.Button>
                      </dt>

                      <Disclosure.Panel as="dd" className="mt-2 px-2">
                        {item.staff.map((item) => (
                          <StaffList {...item} key={item.email} />
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </dl>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

function StaffList(props: StaffListDataProps) {
  const { email, role } = props

  return (
    <div className="mb-2 rounded-md border border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-12 w-12" />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">{role}</h3>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type Inputs = {
  email: string
  role: "Supervisor" | "Manager"
  jobSite: string
}
function StaffModal(form: UseFormReturn<Inputs>) {
  return (
    <form
      className="my-12 space-y-8 divide-y divide-gray-200"
      onSubmit={() => {
        console.log("In the form")
      }}
    >
      <div className="mt-6 grid grid-cols-1 gap-4">
        <div className="col-span-1">
          <label htmlFor="job-site" className="block text-sm font-medium text-gray-700">
            Job Site
          </label>
          <div className="mt-1">
            <select {...form.register("jobSite")}>
              <option>Site 1</option>
              <option>Site 2</option>
              <option>Site 3</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <div className="mt-1">
            <select {...form.register("role")}>
              <option>Supervisor</option>
              <option>Manager</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input className="form-input" {...form.register("email")} required />
            {form.formState.errors.email && <span>This field is required</span>}
          </div>
        </div>
      </div>
    </form>
  )
}
