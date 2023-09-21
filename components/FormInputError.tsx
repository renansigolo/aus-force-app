type FormInputErrorProps = {
  message?: string | undefined
}

export function FormInputError({ message }: FormInputErrorProps) {
  return !message ? null : <p className="form-error">{message}</p>
}
