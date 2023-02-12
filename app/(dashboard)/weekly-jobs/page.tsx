import { Calendar } from "@/components/dashboard/Calendar"
import { Heading } from "@/components/dashboard/Heading"
import { SectionWrapper } from "@/components/dashboard/SectionWrapper"

export default function WeeklyJobsPage() {
  return (
    <SectionWrapper>
      <Heading title="Weekly Jobs" />
      <Calendar />
    </SectionWrapper>
  )
}
