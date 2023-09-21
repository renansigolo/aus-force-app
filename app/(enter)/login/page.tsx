import { EnterHeader } from "@/app/(enter)/EnterHeader"
import { LoginForm } from "@/app/(enter)/login/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-full sm:mx-auto sm:w-full sm:max-w-2xl">
      <div className="min-h-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div className="flex h-full flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <EnterHeader title="Log in to your account" description="Or " page="login" />
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
