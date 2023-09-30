"use client"

import { useUserContext } from "@/app/UserContext"
import { Birthdays } from "@/app/dashboard/(home)/Birthdays"
import { Overview } from "@/app/dashboard/(home)/Overview"
import { PendingApprovals } from "@/app/dashboard/(home)/PendingApprovals"
import { WeeklyActivity } from "@/app/dashboard/(home)/WeeklyActivity"
import { Badge } from "@/components/Badge"
import { Container } from "@/components/Container"
import { Leaves } from "@/components/dashboard/Leaves"
import { WelcomePanel } from "@/components/dashboard/WelcomePanel"
import { SearchParams } from "@/lib/schemas"

type DashboardPageProps = { searchParams: SearchParams }
export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { user } = useUserContext()

  return (
    <>
      <Container>
        <section className="flex-1 pb-8">
          <WelcomePanel />

          {user?.role === "client" && (
            <section className="mt-8">
              <PendingApprovals />
            </section>
          )}

          {user?.role === "worker" && (
            <>
              <section className="mt-8">
                <Overview />
              </section>

              <section className="mt-8">
                <WeeklyActivity />
              </section>
            </>
          )}

          <section className="mt-8">
            <Birthdays />
          </section>

          <section className="mt-8">
            <Leaves />
          </section>
        </section>
      </Container>
      <div className="fixed bottom-8 left-1 inline-flex flex-col">
        <Badge>{user?.role}</Badge>
      </div>
    </>
  )
}
