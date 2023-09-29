import { Birthdays } from "@/app/dashboard/Birthdays"
import { Overview } from "@/app/dashboard/Overview"
import { PendingApprovals } from "@/app/dashboard/PendingApprovals"
import { WeeklyActivity } from "@/app/dashboard/WeeklyActivity"
import { Container } from "@/components/Container"
import { Leaves } from "@/components/dashboard/Leaves"
import { WelcomePanel } from "@/components/dashboard/WelcomePanel"

export default function DashboardPage() {
  return (
    <>
      <Container>
        <section className="flex-1 pb-8">
          <WelcomePanel />

          <section className="mt-8">
            <PendingApprovals />
          </section>

          <section className="mt-8">
            <Overview />
          </section>

          <section className="mt-8">
            <WeeklyActivity />
          </section>

          <section className="mt-8">
            <Birthdays />
          </section>

          <section className="mt-8">
            <Leaves />
          </section>
        </section>
      </Container>
    </>
  )
}
