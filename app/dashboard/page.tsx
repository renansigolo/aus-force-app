import { Birthdays } from "@/app/dashboard/(home)/Birthdays"
import { Leaves } from "@/app/dashboard/(home)/Leaves"
import { PendingApprovals } from "@/app/dashboard/(home)/PendingApprovals"
import { ShiftReviewModal } from "@/app/dashboard/(home)/ShiftReviewModal"
import { ShiftsOverview } from "@/app/dashboard/(home)/ShiftsOverview"
import { WeeklyActivity } from "@/app/dashboard/(home)/WeeklyActivity"
import { WelcomePanel } from "@/app/dashboard/(home)/WelcomePanel"
import { Container } from "@/components/Container"
import { ModalWrapper } from "@/components/ModalWrapper"
import { SearchParams } from "@/lib/schemas"

type DashboardPageProps = { searchParams: SearchParams }
export default function DashboardPage({ searchParams }: DashboardPageProps) {
  // const searchParams = useSearchParams()
  const showModal = searchParams.showModal === "true"

  return (
    <>
      <Container>
        <section className="grid gap-y-8 pb-8">
          <WelcomePanel />

          <PendingApprovals />

          <ShiftsOverview />

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
