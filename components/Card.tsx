"use client"

type CardProps = {
  children: React.ReactNode
  buttonAction: () => void
}

export function Card({ children, buttonAction }: CardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <CardHeading
        title="Shift #123"
        buttonLabel="Approve Shift"
        buttonAction={buttonAction}
      />
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  )
}

type CardHeadingProps = {
  title: string
  buttonLabel: string
  buttonAction: () => void
}
function CardHeading({ title, buttonLabel, buttonAction }: CardHeadingProps) {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
        </div>

        {buttonLabel && (
          <div className="ml-4 mt-2 flex-shrink-0">
            <button
              type="button"
              className="btn btn-primary capitalize"
              onClick={() => buttonAction()}
            >
              {buttonLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
