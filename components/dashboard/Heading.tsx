type HeadingProps = {
  title: string
}

export function Heading({ title }: HeadingProps) {
  return (
    <div className="px-4 sm:px-6 md:px-0">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {title}
      </h1>
    </div>
  )
}
