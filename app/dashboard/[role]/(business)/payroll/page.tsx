import { PayrollList } from "@/app/dashboard/[role]/(business)/payroll/PayrollList"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"

export default function PayrollPage() {
  return (
    <PageWrapper>
      <Role role="business">
        <PageHeading title="Payroll" />
        <PayrollList />
      </Role>
    </PageWrapper>
  )
}
