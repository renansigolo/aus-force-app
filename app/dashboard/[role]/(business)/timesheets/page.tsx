import { ClientCycleForm } from "@/app/dashboard/[role]/(business)/timesheets/ClientCycleForm"
import { TimesheetsList } from "@/app/dashboard/[role]/(business)/timesheets/TimesheetsList"
import { ModalWrapper } from "@/components/ModalWrapper"
import { Role } from "@/components/Roles"
import { PageHeading } from "@/components/dashboard/PageHeading"
import { PageWrapper } from "@/components/dashboard/PageWrapper"
import { SearchParams } from "@/lib/schemas"

type TimesheetsPageProps = { searchParams: SearchParams }

export default function TimesheetsPage({ searchParams }: TimesheetsPageProps) {
  const showModal = searchParams.showModal === "true"

  return (
    <>
      <PageWrapper>
        <Role role="business">
          <PageHeading title="Timesheets" />
          <TimesheetsList />
        </Role>
      </PageWrapper>

      <ModalWrapper title="Edit Cycle" showModal={showModal}>
        <ClientCycleForm />
      </ModalWrapper>
    </>
  )
}
