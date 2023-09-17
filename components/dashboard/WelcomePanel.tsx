"use client"

import { UserAvatar } from "@/components/User"
import { mockUser } from "@/lib/constants"
import { auth } from "@/lib/firebase"

export function WelcomePanel() {
  const { currentUser } = auth

  return (
    <section aria-labelledby="profile-overview-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <UserAvatar />
                {/* <img
                  className="mx-auto h-20 w-20 rounded-full"
                  src={mockUser.photoURL || ""}
                  alt="Profile Image"
                /> */}
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">Welcome back,</p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {currentUser?.displayName}
                </p>
                <p className="text-sm font-medium text-gray-600">{mockUser.jobTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
