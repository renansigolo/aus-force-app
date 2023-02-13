import { SectionWrapper } from "@/components/dashboard/SectionWrapper"

export default function RequestLeavePage() {
  return (
    <SectionWrapper>
      <h2 className="heading-2">Request Leave</h2>

      <section className="py-8">
        <div>
          <div className="mb-4">
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason
            </label>
            <select
              id="reason"
              name="reason"
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue="Day Off"
            >
              <option>Day Off</option>
              <option>Holidays</option>
              <option>Vacations</option>
            </select>
          </div>

          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                htmlFor="start-date"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>

              <input
                type="date"
                name="start-date"
                id="start-date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label
                htmlFor="end-date"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                End Date
              </label>

              <input
                type="date"
                name="end-date"
                id="end-date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Notes
          </label>
          <div className="mt-1">
            <textarea
              rows={4}
              name="comment"
              id="comment"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              defaultValue={""}
            />
          </div>
        </div>

        <div className="flex w-full flex-row-reverse pt-4">
          <button className="btn btn-primary">Submit</button>
        </div>
      </section>
    </SectionWrapper>
  )
}
