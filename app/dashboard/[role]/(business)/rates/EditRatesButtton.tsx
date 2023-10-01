"use client"

import { RatesForm } from "@/app/dashboard/[role]/(business)/rates/RatesForm"
import Modal from "@/components/Modal"
import NiceModal from "@ebay/nice-modal-react"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

export function EditRatesButton() {
  return (
    <button
      type="button"
      className="z-20 p-3 hover:cursor-pointer"
      onClick={() =>
        NiceModal.show(Modal, {
          title: "Edit Rates",
          children: <RatesForm />,
        })
      }
    >
      <PencilSquareIcon className="h-6 w-6 text-indigo-600 hover:text-indigo-500" />
    </button>
  )
}
