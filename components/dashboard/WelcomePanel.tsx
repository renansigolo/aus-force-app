"use client"

import { useUserContext } from "@/app/Providers"
import { UserAvatar } from "@/components/User"

export function WelcomePanel() {
  const { user } = useUserContext()

  return (
    <section aria-labelledby="profile-overview-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex flex-shrink-0 justify-center">
                <UserAvatar />
              </div>
              <div className="mt-4 flex flex-col justify-center text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">Welcome back,</p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user?.displayName}</p>
                {/* <p className="text-sm font-medium text-gray-600">{auth.currentUser?.jobTitle}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
