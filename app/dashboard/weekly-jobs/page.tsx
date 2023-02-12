import { SectionWrapper } from "@/app/dashboard/SectionWrapper"
import { Calendar } from "@/app/dashboard/weekly-jobs/Calendar"

export default function WeeklyJobsPage() {
  return (
    <SectionWrapper>
      <h2 className="heading-2">Weekly Jobs</h2>
      <Calendar />
    </SectionWrapper>
  )
}