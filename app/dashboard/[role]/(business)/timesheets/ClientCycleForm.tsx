"use client"

export function ClientCycleForm() {
  return (
    <form className="my-12 space-y-8 divide-y divide-gray-200">
      <div className="mt-6 grid gap-4">
        <div className="col-span-1">
          <label htmlFor="startDay">Starting Day</label>
          <select id="startDay" name="startDay">
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>
        </div>
      </div>
    </form>
  )
}
