import { FormInputError } from "@/components/FormInputError"
import { FieldValues, RegisterOptions, useForm } from "react-hook-form"

type FormInputWrapperProps = {
  id: keyof FieldValues
  title: string
  type: string
  errors: any
  options?: RegisterOptions
}

export function FormInputWrapper({ id, title, type, options, errors }: FormInputWrapperProps) {
  const { register } = useForm()

  return (
    <div>
      <label htmlFor={id}>{title}</label>
      <input type={type} {...register(id, options)} />
      <FormInputError message={errors[id]?.message} />
    </div>
  )
}
