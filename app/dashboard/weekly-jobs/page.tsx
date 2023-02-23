import { Calendar } from "@/app/dashboard/weekly-jobs/Calendar"
import { SectionHeading } from "@/components/dashboard/SectionHeading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"

export default function WeeklyJobsPage() {
  return (
    <SectionWrapper>
      <SectionHeading title="Weekly Jobs" />
      <Calendar />
    </SectionWrapper>
  )
}
