type LoaderProps = {
  show: boolean
}
export function Loader({ show }: LoaderProps) {
  return show ? (
    <div className="mx-2 h-5 w-5 animate-spin rounded-full border-2 border-t-2 border-indigo-700 border-t-indigo-300"></div>
  ) : null
}
