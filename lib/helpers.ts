/** Helper function to join classnames */
export function cn(...classes: string[] | any[]) {
  return classes.filter(Boolean).join(" ")
}
