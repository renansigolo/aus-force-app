import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { BusinessForm } from "@/app/(enter)/sign-up/[role]/BusinessForm"
import { ClientForm } from "@/app/(enter)/sign-up/[role]/ClientForm"
import { WorkerForm } from "@/app/(enter)/sign-up/[role]/WorkerForm"
import { Card, CardContent, CardHeader } from "@/components/Card"
import { SearchParams } from "@/lib/schemas"

type SignUpBusinessPageProps = {
  params: { role: string }
  searchParams: SearchParams
}
export default function SignUpBusinessPage({ params, searchParams }: SignUpBusinessPageProps) {
  const { role } = params
  const { uid } = searchParams

  return (
    <Card>
      <CardHeader>
        <EnterHeader
          title={`${role} Details`}
          description="Enter your details below to sign-up for a new account"
        />
      </CardHeader>

      <CardContent className="flex-col">
        {role === "business" && <BusinessForm uid={String(uid)} />}
        {role === "client" && <ClientForm uid={String(uid)} />}
        {role === "worker" && <WorkerForm uid={String(uid)} />}
      </CardContent>
    </Card>
  )
}
