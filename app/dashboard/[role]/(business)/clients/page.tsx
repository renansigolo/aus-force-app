import { ClientsForm } from "@/app/dashboard/[role]/(business)/clients/ClientsForm"
import { ClientsList } from "@/app/dashboard/[role]/(business)/clients/ClientsList"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { SearchParams } from "@/lib/schemas"

type ClientsPageProps = { searchParams: SearchParams }

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const showModal = searchParams.showModal === "true"

  return (
    <>
      <PageWrapper>
        <Role role="business">
          <PageHeading title="Clients" buttonLabel="Add New Client" />
          <ClientsList />
        </Role>
      </PageWrapper>

      <ModalWrapper title="New Client" showModal={showModal}>
        <ClientsForm />
      </ModalWrapper>
    </>
  )
}
