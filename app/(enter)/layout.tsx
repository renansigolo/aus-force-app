import { Container } from "@/components/Container"

type EnterLayoutProps = {
  children: React.ReactNode
}

export default function EnterLayout({ children }: EnterLayoutProps) {
  return (
    <div className="grid min-h-full place-content-center bg-zinc-50 py-12">
      <Container>{children}</Container>
    </div>
  )
}
