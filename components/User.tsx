"use client"
import { useUserContext } from "@/app/Providers"
import Image from "next/image"

export function UserAvatar() {
  const { user } = useUserContext()

  return (
    <Image
      className="h-20 w-20 rounded-full"
      src={user?.photoURL ?? "/images/profile-placeholder.png"}
      width={80}
      height={80}
      alt="Profile Image"
    />
  )
}
