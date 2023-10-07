import { SignUpForm } from "@/app/(enter)/sign-up/SignUpForm"
import { SearchParams } from "@/lib/schemas"

type SignUpPageProps = {
  searchParams: SearchParams
}
export default function SignUpPage({ searchParams }: SignUpPageProps) {
  const { role } = searchParams || "business"

  return <SignUpForm role={String(role)} />
}
