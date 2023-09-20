import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { ForgotPasswordForm } from "@/app/(enter)/forgot-password/ForgotPasswordForm"
import { ModalSuccess } from "@/app/(enter)/forgot-password/ModalSuccess"
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

      <ModalSuccess showModal={showModal} />
    </>
  )
}
