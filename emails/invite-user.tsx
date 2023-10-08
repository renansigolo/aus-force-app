import { UserRoles } from "@/app/dashboard/profile/page"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

export type InviteUserEmailProps = {
  clientName: string
  clientEmail: string
  clientRole?: UserRoles
  invitedByDisplayName: string
  invitedByEmail: string
}

const baseUrl = process.env.VERCEL_URL ? process.env.VERCEL_URL : ""

export default function InviteUserEmail({
  clientName,
  clientRole,
  invitedByDisplayName,
  invitedByEmail,
}: InviteUserEmailProps) {
  const previewText = `Join ${invitedByDisplayName} on AUS Force App`
  const inviteLink = clientRole ? `${baseUrl}/sign-up?role=${clientRole}` : `${baseUrl}/sign-up`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/icon.png`}
                width="40"
                height="37"
                alt="AUS Force logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>{invitedByDisplayName}</strong> on the <strong>AUS Force App</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hello {clientName},</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{invitedByDisplayName}</strong> (
              <Link href={`mailto:${invitedByEmail}`} className="text-indigo-600 no-underline">
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>AUS Force App</strong>.
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                pX={20}
                pY={12}
                className="rounded bg-[#000000] text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteLink} className="text-indigo-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              © 2023 AUS Force. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
