import { RectangleGroupIcon } from "@heroicons/react/24/outline"

type EmptyProps = {
  title: string
}

export function Empty(props: EmptyProps) {
  return (
    <div className="grid w-full place-content-center place-items-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
      <RectangleGroupIcon className="h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No {props.title}
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new {props.title}.
      </p>
    </div>
  )
}
