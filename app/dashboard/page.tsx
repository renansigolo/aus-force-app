"use client"

import { useUserContext } from "@/app/UserContext"
import { Birthdays } from "@/app/dashboard/(home)/Birthdays"
import { Leaves } from "@/app/dashboard/(home)/Leaves"
import { Overview } from "@/app/dashboard/(home)/Overview"
import { PendingApprovals } from "@/app/dashboard/(home)/PendingApprovals"
import { WeeklyActivity } from "@/app/dashboard/(home)/WeeklyActivity"
import { WelcomePanel } from "@/app/dashboard/(home)/WelcomePanel"
import { Container } from "@/components/Container"

export default function DashboardPage() {
  const { user } = useUserContext()

  return (
    <Container>
      <section className="grid gap-y-8 pb-8">
        <WelcomePanel />

        {(user?.role === "client" || user?.role === "admin") && <PendingApprovals />}

        {(user?.role === "worker" || user?.role === "admin") && (
          <>
            <Overview />
            <WeeklyActivity />
          </>
        )}

        <Birthdays />
        <Leaves />
      </section>
    </Container>
  )
}
