"use client";

import { SectionHeading } from "@/components/dashboard/SectionHeading";
import { SectionWrapper } from "@/components/dashboard/SectionWrapper";
import { Empty } from "@/components/Empty";
import Modal from "@/components/Modal";
import { Role } from "@/components/Roles";
import NiceModal from "@ebay/nice-modal-react";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default function AllocationsPage() {
  const showModal = () =>
    NiceModal.show(Modal, {
      title: "New Allocation",
      children: <AllocationModal />,
    });

  return (
    <SectionWrapper>
      <Role role="business">
        <SectionHeading
          title="Allocations"
          buttonLabel="New Allocation"
          buttonAction={showModal}
        />
        <section className="py-8">
          <Empty title="allocations" />
        </section>
      </Role>
    </SectionWrapper>
  );
}

function AllocationModal() {
  return (
    <>
      <form className="my-12 space-y-8 divide-y divide-gray-200">
        <div className="mt-6 grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <label
              htmlFor="allocation-name"
              className="block text-sm font-medium text-gray-700"
            >
              Allocation Name
            </label>
            <div className="mt-1">
              <input
                required
                id="allocation-name"
                name="allocation-name"
                type="text"
              />
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="rate"
              className="block text-sm font-medium text-gray-700"
            >
              Rate (per hour)
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <CurrencyDollarIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input type="number" name="rate" id="rate" className="pl-10" />
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="rate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <div className="mt-1">
              <input type="datetime-local" name="" id="" />
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="rate"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <div className="mt-1">
              <input type="datetime-local" name="" id="" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
