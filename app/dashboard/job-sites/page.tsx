"use client";

import { SectionHeading } from "@/components/dashboard/SectionHeading";
import { SectionWrapper } from "@/components/dashboard/SectionWrapper";
import { Empty } from "@/components/Empty";
import Modal from "@/components/Modal";
import { Role } from "@/components/Roles";
import NiceModal from "@ebay/nice-modal-react";
import {
  BuildingOffice2Icon,
  CloudArrowDownIcon,
} from "@heroicons/react/24/outline";

type JobSitesListDataProps = {
  siteName: string;
  siteAddress: string;
  hasParking: boolean;
  additionalNotes: string;
  policyAndProceduresUrl: string;
};
const jobSitesListData: JobSitesListDataProps[] = [
  {
    siteName: "Job Site A",
    siteAddress: "377/12 Church Avenue, Mascot NSW 2020",
    hasParking: true,
    additionalNotes:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ipsam accusamus qui quibusdam ducimus provident illum ullam et itaque beatae minus, pariatur quasi alias deserunt? Perspiciatis alias corrupti officia error!",
    policyAndProceduresUrl: "",
  },
  {
    siteName: "Job Site B",
    siteAddress: "132/35 La La Land, Bondi Junction NSW 2021",
    hasParking: false,
    additionalNotes:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ipsam accusamus qui quibusdam ducimus provident illum ullam et itaque beatae minus, pariatur quasi alias deserunt? Perspiciatis alias corrupti officia error!",
    policyAndProceduresUrl: "#",
  },
  {
    siteName: "Job Site C",
    siteAddress: "1325 Le Factory, Cooggee NSW 2030",
    hasParking: false,
    additionalNotes: "",
    policyAndProceduresUrl: "#",
  },
];

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

        <section className="py-8">
          {jobSitesListData.map((item) => (
            <JobSitesList {...item} key={item.siteName} />
          ))}
        </section>
      </Role>
    </SectionWrapper>
  );
}

function JobSitesList(props: JobSitesListDataProps) {
  return (
    <div className="mb-2 rounded-md border border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BuildingOffice2Icon className="h-12 w-12" />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {props.siteName}
              </h3>

              <div className="mt-1 mb-2">
                <p className="text-sm text-gray-500">{props.siteAddress}</p>
                <p className="text-sm text-gray-500">
                  {props.hasParking ? "🚘 Parking Available" : "X No Parking"}
                </p>
              </div>

              <p className="text-sm text-gray-500">{props.additionalNotes}</p>
            </div>
          </div>
        </div>
        <div className="ml-4 mt-4 flex flex-shrink-0">
          <a href={props.policyAndProceduresUrl}>
            <button
              type="button"
              className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <CloudArrowDownIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Policy And Procedures</span>
            </button>
          </a>
        </div>
      </div>
    </div>
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
