import { ClientsForm } from "@/app/dashboard/[role]/(business)/clients/ClientsForm"
import { ClientData, ClientsList } from "@/app/dashboard/[role]/(business)/clients/ClientsList"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { getCollectionQuery } from "@/lib/firebase"
import { SearchParams } from "@/lib/schemas"
import { orderBy } from "firebase/firestore"

type ClientsPageProps = { searchParams: SearchParams }

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const showModal = searchParams.showModal === "true"
  const data = await getCollectionQuery<ClientData>("clients", orderBy("name", "desc"))

  return (
    <>
      <PageWrapper>
        <Role role="business">
          <PageHeading title="Clients" buttonLabel={data.length < 5 ? "Add New Client" : ""} />
          <ClientsList data={data} />
        </Role>
      </PageWrapper>

      <ModalWrapper title="New Client" showModal={showModal}>
        <ClientsForm />
      </ModalWrapper>
    </>
  )
}
