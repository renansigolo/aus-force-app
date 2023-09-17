"user client"

import { auth } from "@/lib/firebase"
import Image from "next/image"

export function UserAvatar() {
  return (
    <Image
      className="mx-auto h-20 w-20 rounded-full"
      src={auth.currentUser?.photoURL || "/images/profile-placeholder.png"}
      width={80}
      height={80}
      alt="Profile Image"
    />
  )
}
