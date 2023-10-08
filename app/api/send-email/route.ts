import InviteUserEmail, { InviteUserEmailProps } from "@/emails/invite-user"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body: InviteUserEmailProps = await req.json()

  const data = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "renan.sigolo@gmail.com", // Can only send to my email while domain in resend has not been verified
    // to: body.clientEmail,
    subject: `Join ${body.invitedByDisplayName} on the AUS Force App`,
    react: InviteUserEmail(body),
  })

  // return Response.json({ message: "ok" })
  return Response.json(data)
}
