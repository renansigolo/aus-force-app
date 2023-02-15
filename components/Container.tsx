type ContainerProps = {
  children: React.ReactNode
}
export function Container({ children }: ContainerProps) {
  return (
    <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
