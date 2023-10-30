import { Birthdays } from "@/app/dashboard/(home)/Birthdays"
import { Leaves } from "@/app/dashboard/(home)/Leaves"
import { PendingApprovals } from "@/app/dashboard/(home)/PendingApprovals"
import { ShiftReviewModal } from "@/app/dashboard/(home)/ShiftReviewModal"
import { ShiftsOverview } from "@/app/dashboard/(home)/ShiftsOverview"
import { WeeklyActivity } from "@/app/dashboard/(home)/WeeklyActivity"
import { WelcomePanel } from "@/app/dashboard/(home)/WelcomePanel"
import { JobRequest } from "@/app/dashboard/[role]/(client)/job-requests/page"
import { Container } from "@/components/Container"
import { ModalWrapper } from "@/components/ModalWrapper"
import { getCollectionQuery } from "@/lib/firebase"
import { SearchParams } from "@/lib/schemas"
import { where } from "firebase/firestore"

type DashboardPageProps = { searchParams: SearchParams }
export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const showModal = searchParams.showModal === "true"
  const jobs = await getCollectionQuery<JobRequest>(
    "jobRequests",
    where("allocatedWorker.id", "==", "leslie-alexander"),
  )

  return (
    <>
      <Container>
        <section className="grid gap-y-8 pb-8">
          <WelcomePanel />

          <PendingApprovals />

          <ShiftsOverview jobs={jobs} />

          <WeeklyActivity />

          <Birthdays />

          <Leaves />
        </section>
      </Container>

      <ModalWrapper title="Review Shift" showModal={showModal}>
        <ShiftReviewModal />
      </ModalWrapper>
    </>
  )
}
