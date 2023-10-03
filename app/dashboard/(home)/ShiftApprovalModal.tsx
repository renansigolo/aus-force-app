import { Button } from "@/components/Button"
import toast from "react-hot-toast"

export function ShiftApprovalModal() {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast.error("Not implemented yet")
  }

  return (
    <>
      <form className="my-6 space-y-8 divide-y divide-gray-200" onSubmit={onSubmit}>
        <div className="mt-6 grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <label htmlFor="site-name">Company</label>
            <div className="mt-1">
              <input required id="site-name" name="site-name" type="text" />
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor="role">Job site</label>
            <div className="mt-1">
              <select id="role" name="role">
                <option>Site 01</option>
                <option>Site 02</option>
              </select>
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor="start-datetime">Start Time</label>
            <div className="mt-1">
              <input type="datetime-local" name="start-datetime" id="start-datetime" />
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor="end-datetime">End Time</label>
            <div className="mt-1">
              <input type="datetime-local" name="end-datetime" id="end-datetime" />
            </div>
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
            <div className="mt-1">
              <textarea id="additional-notes" name="additional-notes" />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col-reverse justify-end gap-2 pl-3 pr-4 pt-4 text-right text-sm font-medium lg:flex-row">
          <Button className="btn-secondary" href={"?showModal=false"}>
            Cancel
          </Button>
          <Button type="submit" className="btn-success">
            Submit
          </Button>
        </div>
      </form>
    </>
  )
}
