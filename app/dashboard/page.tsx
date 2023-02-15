"use client"

import { Container } from "@/components/Container"
import { Overview } from "@/components/dashboard/Overview"
import { WeeklyActivity } from "@/components/dashboard/WeeklyActivity"
import { WelcomePanel } from "@/components/dashboard/WelcomePanel"

export default function DashboardPage() {
  return (
    <section className="flex-1 pb-8">
      <Container>
        <WelcomePanel />
      </Container>

      <section className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Overview />
        </div>
      </section>

      <section className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <WeeklyActivity />
        </div>
      </section>
    </section>
  )
}
