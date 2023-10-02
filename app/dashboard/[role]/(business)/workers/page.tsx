import { WorkersList } from "@/app/dashboard/[role]/(business)/workers/WorkersList"
import { DatabaseUser } from "@/app/dashboard/profile/page"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { getCollectionQuery } from "@/lib/firebase"
import { where } from "firebase/firestore"

export default async function WorkersPage() {
  const workers = (await getCollectionQuery(
    "users",
    where("role", "==", "worker"),
  )) as DatabaseUser[]

  return (
    <PageWrapper>
      <Role role="business">
        <PageHeading title="Workers" />
        <WorkersList workers={workers} />
      </Role>
    </PageWrapper>
  )
}
