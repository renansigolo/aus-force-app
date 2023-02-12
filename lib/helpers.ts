/** Helper function to join classnames */
export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
