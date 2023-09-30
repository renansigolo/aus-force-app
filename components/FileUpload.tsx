import { DocumentArrowUpIcon } from "@heroicons/react/24/outline"
import { ReactNode } from "react"

type FileUploadProps = {
  title: string
  children: ReactNode
}

export function FileUpload({ title, children }: FileUploadProps) {
  return (
    <>
      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
        Cover photo
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
          <div className="mt-2 flex justify-center text-sm leading-6 text-gray-600">
            <label
              htmlFor="policyAndProceduresFile"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              {children}
            </label>
          </div>
          <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 1MB</p>
        </div>
      </div>
    </>
  )
}
