import { Container } from "@/components/Container"

type EnterLayoutProps = {
  children: React.ReactNode
}
export default function EnterLayout({ children }: EnterLayoutProps) {
  return (
    <>
      <div className="grid min-h-full place-content-center bg-zinc-50 py-12">
        <Container>
          <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {children}
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
