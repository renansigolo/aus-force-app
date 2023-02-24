import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"
import { Empty } from "@/components/Empty"

export default function JobRequestsPage() {
  return (
    <SectionWrapper>
      <SectionHeading title="Job Requests" buttonLabel="New Job" />
      <section className="py-8">
        <Empty title="job requests" />
      </section>
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
              Site Name
            </label>
            <div className="mt-1">
              <input required id="site-name" name="site-name" type="text" />
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <div className="mt-1">
              <input required id="address" name="address" type="text" />
            </div>
          </div>

          <div className="col-span-1">
            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="parking"
                  aria-describedby="parking-description"
                  name="parking"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="parking" className="font-medium text-gray-700">
                  Parking available for workers?
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
        </div>
      </form>
    </>
  )
}
