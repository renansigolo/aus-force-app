type LoaderProps = {
  show: boolean
}

export function Loader({ show }: LoaderProps) {
  return show ? (
    <progress className="progress progress-primary w-56"></progress>
  ) : null
}
