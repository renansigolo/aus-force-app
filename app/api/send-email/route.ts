import { InviteUserEmail } from "@/react-email/emails/invite-user"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const res = await request.json()

  const data = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "renan.sigolo@gmail.com",
    subject: `Join Renan Sigolo on AUS Force App`,
    react: InviteUserEmail({
      username: "Vinicius Turl",
      invitedByDisplayName: "renansigolo",
      invitedByEmail: "renan.sigolo@gmail.com",
      teamName: "Renan Team",
    }),
  })

  return Response.json(data)
}
