import toast from "react-hot-toast"

export const showErrorMessage = (error: unknown): string => {
  let message: string

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message)
  } else if (typeof error === "string") {
    message = error
  } else {
    message = "Something went wrong"
  }

  console.error(message)
  toast.error(message)
  return message
}

/** Format the date as YYY-MM-DD */
export const getISODate = (inputDate?: string): string => {
  const date = inputDate ? new Date(inputDate) : new Date()
  return date.toISOString().split("T")[0]
}
