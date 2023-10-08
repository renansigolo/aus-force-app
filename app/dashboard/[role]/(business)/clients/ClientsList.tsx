import { ClientListItem } from "@/app/dashboard/[role]/(business)/clients/ClientListItem"
import { Empty } from "@/components/Empty"

export type ClientData = {
  id: string
  createdAt: Date
  name: string
  email: string
  jobSite?: string
}

type ClientsListProps = {
  data: ClientData[]
}

export async function ClientsList({ data }: ClientsListProps) {
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
