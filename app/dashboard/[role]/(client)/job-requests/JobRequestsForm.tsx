"use client"

import { JobRequest } from "@/app/dashboard/[role]/(client)/job-requests/page"
import { JobSitesData } from "@/app/dashboard/[role]/(client)/job-sites/page"
import { Button } from "@/components/Button"
import { createDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { Tab } from "@headlessui/react"
import { serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { UseFormReturn, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { twMerge } from "tailwind-merge"

type JobRequestsFormProps = {
  jobSitesData: JobSitesData[]
}
export function JobRequestsForm({ jobSitesData }: JobRequestsFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<JobRequest>({ shouldUseNativeValidation: true })

  const hideModal = () => router.push("?showModal=false")

  const onSubmit = async (values: JobRequest) => {
    const payload = {
      ...values,
      status: "pendingWorkerAllocation",
      createdAt: serverTimestamp(),
    }

    try {
      await createDocument("jobRequests", payload)
      reset()
      router.refresh()
      toast.success("Job request submitted")
      hideModal()
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-8 grid grid-cols-1 gap-4">
      <div>
        <label htmlFor="jobSite">Job Site</label>
        <select
          id="jobSite"
          disabled={isSubmitting}
          {...register("jobSite", { required: "Job site is required" })}
        >
          {jobSitesData.map((jobSite) => (
            <option key={jobSite.id}>{jobSite.siteName}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="supplier">Select Supplier</label>
        <select
          id="supplier"
          disabled={isSubmitting}
          {...register("supplier", { required: "Supplier id required" })}
        >
          <option>Supplier 01</option>
          <option>Supplier 02</option>
          <option>Supplier 03</option>
        </select>
      </div>

      <Tabs register={register} />

      <div>
        <label htmlFor="additionalNotes">Additional Notes</label>
        <textarea id="additionalNotes" {...register("additionalNotes")} disabled={isSubmitting} />
      </div>

      <div className="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button type="submit" className="btn-success" disabled={isSubmitting || !isValid}>
          Submit
        </Button>
        <Button
          type="button"
          className="btn-secondary"
          onClick={() => hideModal()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

type TabsProps = {
  register: UseFormReturn<JobRequest>["register"]
}

function Tabs({ register }: TabsProps) {
  return (
    <div className="w-full sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1">
          <Tab
            className={({ selected }) =>
              twMerge(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-indigo-50 hover:bg-white/[0.12] hover:text-white",
              )
            }
          >
            Worker
          </Tab>
          <Tab
            className={({ selected }) =>
              twMerge(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-indigo-50 hover:bg-white/[0.12] hover:text-white",
              )
            }
          >
            Service
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-2">
          <Tab.Panel className="grid grid-cols-1 gap-4">
            <WorkerFields register={register} />
          </Tab.Panel>
          <Tab.Panel className="grid grid-cols-1 gap-4">
            <ServiceFields register={register} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

type WorkerFieldsProps = {
  register: UseFormReturn<JobRequest>["register"]
}

function WorkerFields({ register }: WorkerFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="jobPosition">Job Position</label>
        <select id="jobPosition" {...register("jobPosition")}>
          <option>General Labour</option>
          <option>Skill Labour</option>
          <option>Traffic Controller</option>
          <option>Forklift Operator</option>
          <option>LO Operator</option>
          <option>Picker/Packer</option>
          <option>Dogman</option>
          <option>Crane Operator</option>
          <option>Rigger</option>
          <option>Escavator Operator</option>
          <option>Trade Assistant</option>
          <option>Carpenter</option>
          <option>Steel Fixer</option>
          <option>Formworker</option>
          <option>Manitou Operator</option>
          <option>Other</option>
        </select>
      </div>

      {/* If the selection of job position is Other */}
      {/* <div>
        <label htmlFor="jobPosition" >
          Job Position
        </label>
        <input type="text" name="jobPosition" />
      </div> */}

      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          {...register("quantity", { valueAsNumber: true, min: 0, minLength: 0 })}
        />
      </div>

      <div>
        <label htmlFor="startDateTime">Start Time</label>
        <input
          id="startDateTime"
          type="datetime-local"
          {...register("startDateTime", { required: "Start date and time is required" })}
        />
      </div>

      <div>
        <label htmlFor="endDateTime">End Time</label>
        <input id="endDateTime" type="datetime-local" {...register("endDateTime")} />
      </div>

      <div className="flex h-5 flex-row-reverse items-center justify-end gap-2">
        <label htmlFor="break" className="text-sm font-medium text-gray-700">
          Break?
        </label>
        <input
          {...register("break")}
          id="break"
          type="checkbox"
          aria-describedby="break-description"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
    </>
  )
}

type ServiceFieldsProps = {
  register: UseFormReturn<JobRequest>["register"]
}

function ServiceFields({ register }: ServiceFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="serviceDescription">Service Description</label>
        <input type="text" {...register("serviceDescription")} />
      </div>

      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          {...register("quantity", { valueAsNumber: true, min: 0, minLength: 0 })}
          type="number"
        />
      </div>

      <div>
        <label htmlFor="startDateTime">Start Time</label>
        <input
          type="datetime-local"
          {...register("startDateTime", { required: "Start date and time is required" })}
        />
      </div>
    </>
  )
}
