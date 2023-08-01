"use client"

type SectionHeadingProps = {
  title: string
  buttonLabel?: string
  buttonAction?: () => void
}

export function SectionHeading({ title, buttonLabel, buttonAction }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="heading-2">{title}</h2>
      {buttonLabel && (
        <button className="btn btn-primary" onClick={buttonAction}>
          {buttonLabel}
        </button>
      )}
    </div>
  )
}
