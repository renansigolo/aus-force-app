import { Container } from "@/components/Container"
import { ReactNode } from "react"

type EnterLayoutProps = {
  children: ReactNode
}
export default function EnterLayout({ children }: EnterLayoutProps) {
  return (
    <div className="bg-zinc-50">
      <Container>
        <div className="flex min-h-full h-screen flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
