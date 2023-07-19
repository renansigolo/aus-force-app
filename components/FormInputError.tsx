type FormInputErrorProps = {
  message?: string | undefined;
};

export function FormInputError({ message }: FormInputErrorProps) {
  if (!message) return null;

  return (
    <div className="py-2">
      <h3 className="text-sm font-medium text-red-800">{message}</h3>
    </div>
  );
}
