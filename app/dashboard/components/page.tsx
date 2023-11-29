"use client"

import { Button } from "@/components/Button"
import toast from "react-hot-toast"

export default function ComponentsPage() {
  return (
    <>
      <Button onClick={() => toast.success("asd")}>Toast</Button>
    </>
  )
}
