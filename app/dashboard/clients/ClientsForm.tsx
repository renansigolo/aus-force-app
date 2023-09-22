import Link from "next/link"

export function ClientsForm() {
  return (
    <form className="my-8 grid gap-4">
      <div>
        <label htmlFor="businessName" className="form-label">
          Business Name
        </label>
        <input type="text" name="businessName" placeholder="Full Name" />
      </div>

      <div>
        <label htmlFor="businessEmail" className="form-label">
          Email
        </label>
        <input type="email" name="businessEmail" placeholder="example@email.com" />
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Submit
        </button>
        <Link
          href="?showModal=false"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
