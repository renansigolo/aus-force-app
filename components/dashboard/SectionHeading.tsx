"use client"

import Modal from "@/components/Modal"
import NiceModal from "@ebay/nice-modal-react"

type SectionHeadingProps = {
  title: string
  buttonLabel?: string
  children?: React.ReactNode
}

export function SectionHeading({
  title,
  buttonLabel,
  children,
}: SectionHeadingProps) {
  const showModal = () =>
    NiceModal.show(Modal, {
      title: buttonLabel,
      description: "Please review the details and confirm your shift.",
      children,
    })

  return (
    <div className="flex items-center justify-between">
      <h2 className="heading-2">{title}</h2>
      {buttonLabel && (
        <button className="btn btn-primary" onClick={showModal}>
          {buttonLabel}
        </button>
      )}
    </div>
  )
}
