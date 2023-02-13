"use client"

type LoaderProps = {
  show: boolean
}
export function Loader({ show }: LoaderProps) {
  return show ? (
    <div className="h-12 w-12 animate-spin rounded-full border-2 border-t-2 border-indigo-700 border-t-indigo-300"></div>
  ) : null
}
