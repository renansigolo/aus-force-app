import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { ForgotPasswordForm } from "@/app/(enter)/forgot-password/ForgotPasswordForm"
import { ModalSuccess } from "@/components/ModalSuccess"
import { SearchParams } from "@/lib/schemas"

type ForgotPasswordPageProps = {
  searchParams: SearchParams
}

export default function ForgotPasswordPage({ searchParams }: ForgotPasswordPageProps) {
  const showModal = searchParams.showModal === "true"

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="min-h-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <EnterHeader
            title="Forgot your password?"
            description="Enter your email address below and we will send you a link to reset"
          />
          <ForgotPasswordForm />
        </div>
      </div>

      <ModalSuccess
        title="Email sent successfully"
        description="We sent you an email with a link to reset your password. If you do not see the email, please check your spam folder."
        showModal={showModal}
      />
    </>
  )
}
