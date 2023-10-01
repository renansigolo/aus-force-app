import { InvoicesList } from "@/app/dashboard/[role]/(business)/invoices/InvoicesList"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"

export default function InvoicesPage() {
  return (
    <PageWrapper>
      <Role role="business">
        <PageHeading title="Invoices" />
        <InvoicesList />
      </Role>
    </PageWrapper>
  )
}
