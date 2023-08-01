import { LoginFormSchemaType } from "@/lib/schemas"
import { UseFormRegister } from "react-hook-form"

type FormInputWrapperProps = {
  register: UseFormRegister<LoginFormSchemaType>
  id: keyof LoginFormSchemaType
  name: string
  type: string
}

export function FormInputWrapper({ register, id, name, type }: FormInputWrapperProps) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {name}
      </label>
      <input className="form-input" type={type} {...register(id)} />
    </div>
  )
}
