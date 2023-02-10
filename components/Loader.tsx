"use client"

type LoaderProps = {
  show: boolean
}
export function Loader({ show }: LoaderProps) {
  return show ? (
    <div className="border-indigo-700 border-2 rounded-full w-12 h-12 border-t-2 border-t-indigo-300 animate-spin"></div>
  ) : null
}
