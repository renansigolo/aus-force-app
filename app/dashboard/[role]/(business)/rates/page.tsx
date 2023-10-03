import { ClientData } from "@/app/dashboard/[role]/(business)/clients/ClientsList"
import { RatesForm } from "@/app/dashboard/[role]/(business)/rates/RatesForm"
import { RatesList } from "@/app/dashboard/[role]/(business)/rates/RatesList"
import { Empty } from "@/components/Empty"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { getCollectionQuery } from "@/lib/firebase"
import { SearchParams } from "@/lib/schemas"
import { orderBy } from "firebase/firestore"

type RatesPageProps = { searchParams: SearchParams }

export default async function RatesPage({ searchParams }: RatesPageProps) {
  const showModal = searchParams.showModal === "true"
  const data = await getCollectionQuery<ClientData>("clients", orderBy("name", "desc"))

  return (
    <>
      <PageWrapper>
        <Role role="business">
          <PageHeading title="Rates" />

          <div className="grid gap-4">
            {data.length === 0 ? <Empty title="rates" /> : <RatesList data={data} />}
          </div>
        </Role>
      </PageWrapper>

      <ModalWrapper title="New Rates" showModal={showModal}>
        <RatesForm />
      </ModalWrapper>
    </>
  )
}
