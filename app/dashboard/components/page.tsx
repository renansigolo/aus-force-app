"use client"

import { Button } from "@/components/Button"
import toast from "react-hot-toast"

export default function ComponentsPage() {
  return (
    <>
      <h1>Test Components in Isolation</h1>
      <Button onClick={() => toast.success("Working")}>Toast</Button>
    </>
  )
}
