import Link from "next/link"

type PageHeadingProps = {
  title: string
  buttonLabel?: string
}

export function PageHeading({ title, buttonLabel }: PageHeadingProps) {
  return (
    <div className="flex items-center justify-between pb-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">{title}</h2>
      {buttonLabel && (
        <Link className="btn btn-primary" href={"?showModal=true"}>
          {buttonLabel}
        </Link>
      )}
    </div>
  )
}
