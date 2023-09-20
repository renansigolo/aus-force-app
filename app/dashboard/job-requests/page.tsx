import { JobRequestsForm } from "@/app/dashboard/job-requests/JobRequestsForm"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { SearchParams } from "@/lib/schemas"
import { ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/outline"

const data = [
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

type JobRequestsPageProps = { searchParams: SearchParams }

export default function JobRequestsPage({ searchParams }: JobRequestsPageProps) {
  const showModal = searchParams.showModal === "true"

  return (
    <SectionWrapper>
      <Role role="client">
        <SectionHeading title="Job Requests" buttonLabel="New Job" />

        <section className="py-8">
          {data ? <JobRequestList /> : <Empty title="job requests" />}
        </section>
      </Role>

      <ModalWrapper title="New Job" showModal={showModal}>
        <JobRequestsForm />
      </ModalWrapper>
    </SectionWrapper>
  )
}

function JobRequestList() {
  return (
    <div className="grid grid-cols-1 gap-2">
      {data.map((item) => (
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
