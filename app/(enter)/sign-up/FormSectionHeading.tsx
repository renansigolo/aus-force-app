type FormHeadingProps = {
  title: string
  description: string
}

export function FormSectionHeading({ title, description }: FormHeadingProps) {
  return (
    <div className="pt-8">
      <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  )
}
