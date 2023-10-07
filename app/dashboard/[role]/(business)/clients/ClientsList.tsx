import { ClientListItem } from "@/app/dashboard/[role]/(business)/clients/ClientListItem"
import { Empty } from "@/components/Empty"
import { getCollectionQuery } from "@/lib/firebase"
import { orderBy } from "firebase/firestore"

export type ClientData = {
  id: string
  createdAt: Date
  name: string
  email: string
  jobSite?: string
}

export async function ClientsList() {
  const data = await getCollectionQuery<ClientData>("clients", orderBy("name", "desc"))

  return data.length > 0 ? (
    <div className="grid grid-cols-1 gap-4">
      {data.map((item) => (
        <ClientListItem key={item.id} data={item} />
      ))}
    </div>
  ) : (
    <Empty title="clients" />
  )
}
