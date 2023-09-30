"use client"

import { useUserContext } from "@/app/UserContext"
import Image from "next/image"
import { twMerge } from "tailwind-merge"

type UserAvatarProps = {
  className?: string
}

export function UserAvatar({ className }: UserAvatarProps) {
  const { user } = useUserContext()

  return (
    <Image
      className={twMerge("h-20 w-20 rounded-full", className)}
      src={user?.photoURL ?? "/images/profile-placeholder.png"}
      width={80}
      height={80}
      alt="Profile Image"
    />
  )
}
