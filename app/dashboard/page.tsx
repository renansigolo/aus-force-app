import { Container } from "@/components/Container";
import { Overview } from "@/components/dashboard/Overview";
import { PendingApproval } from "@/components/dashboard/PendingApproval";
import { WeeklyActivity } from "@/components/dashboard/WeeklyActivity";
import { WelcomePanel } from "@/components/dashboard/WelcomePanel";

export default function DashboardPage() {
  return (
    <>
      <Container>
        <section className="flex-1 pb-8">
          <WelcomePanel />

          <section className="mt-8">
            <PendingApproval />
          </section>

          <section className="mt-8">
            <Overview />
          </section>

          <section className="mt-8">
            <WeeklyActivity />
          </section>
        </section>
      </Container>
    </>
  );
}
