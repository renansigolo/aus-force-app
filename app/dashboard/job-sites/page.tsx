"use client";

import { SectionHeading } from "@/components/dashboard/SectionHeading";
import { SectionWrapper } from "@/components/dashboard/SectionWrapper";
import { Empty } from "@/components/Empty";
import Modal from "@/components/Modal";
import { Role } from "@/components/Roles";
import NiceModal from "@ebay/nice-modal-react";

export default function JobSitesPage() {
  const showModal = () =>
    NiceModal.show(Modal, {
      title: "New Site",
      children: <JobSiteModal />,
    });

  return (
    <SectionWrapper>
      <Role role="client">
        <SectionHeading
          title="Job Sites"
          buttonLabel="New Site"
          buttonAction={showModal}
        />

        <section className="py-8">
          <Empty title="job sites" />
        </section>
      </Role>
    </SectionWrapper>
  );
}

function JobSiteModal() {
  return (
    <>
      <form className="my-12 space-y-8 divide-y divide-gray-200">
        <div className="mt-6 grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <label
              htmlFor="site-name"
              className="block text-sm font-medium text-gray-700"
            >
              Site Name
            </label>
            <div className="mt-1">
              <input required id="site-name" name="site-name" type="text" />
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <div className="mt-1">
              <input required id="address" name="address" type="text" />
            </div>
          </div>

          <div className="col-span-1">
            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="parking"
                  aria-describedby="parking-description"
                  name="parking"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="parking" className="font-medium text-gray-700">
                  Parking available for workers?
                </label>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="additional-notes"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Notes
            </label>
            <div className="mt-1">
              <textarea id="additional-notes" name="additional-notes" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Policies and Procedures
            </label>
            <button
              type="button"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                />
              </svg>
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                Upload a new policy
              </span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
