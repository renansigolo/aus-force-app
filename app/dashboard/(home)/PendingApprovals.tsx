import { PendingApprovalsList } from "@/app/dashboard/(home)/PendingApprovalsList"
import { AccordionProps } from "@/components/Accordion"
import { Empty } from "@/components/Empty"
import { Role } from "@/components/Roles"

const accordionItems: AccordionProps["items"] = []
// const accordionItems: AccordionProps["items"] = [
//   {
//     title: "Shift 02/06/23",
//     actionButton: <Badge className="whitespace-nowrap">14 Approvals Pending</Badge>,
//     children: <ShiftTable />,
//   },
// ]

export function PendingApprovals() {
  return (
    <Role role="client">
      <div>
        <h2 className="heading-3 mb-3">Pending Approvals</h2>
        {accordionItems.length === 0 ? (
          <Empty title="shift" />
        ) : (
          <PendingApprovalsList items={accordionItems} />
        )}
      </div>
    </Role>
  )
}
