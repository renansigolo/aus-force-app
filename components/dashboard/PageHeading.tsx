import Link from "next/link"

type PageHeadingProps = {
  title: string
  buttonLabel?: string
}

export function PageHeading({ title, buttonLabel }: PageHeadingProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="md:text-3xl; text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
      {buttonLabel && (
        <Link className="btn btn-primary" href={"?showModal=true"}>
          {buttonLabel}
        </Link>
      )}
    </div>
  )
}
