import { HTMLAttributes, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

type CardProps = HTMLAttributes<HTMLDivElement>

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      "divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge("flex items-center justify-between gap-1 px-4 py-5 sm:px-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardContent = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge("flex gap-2 px-4 py-5 sm:p-6", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge("flex flex-row-reverse px-4 py-4 sm:px-6", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardFooter, CardHeader }
