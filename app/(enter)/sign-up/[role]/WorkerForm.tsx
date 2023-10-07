"use client"

import { FormSectionHeading } from "@/app/(enter)/sign-up/FormSectionHeading"
import { Button } from "@/components/Button"
import { CardFooter } from "@/components/Card"
import { Divider } from "@/components/Divider"
import { updateDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { RegisterWorkerFormDefaultValues, TRegisterWorkerFormDefaultValues } from "@/lib/schemas"
import { Disclosure } from "@headlessui/react"
import { DocumentArrowUpIcon, MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { UseFormReturn, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { isDirty } from "zod"

const documentsForm = [
  {
    required: "",
    name: "Traffic Controller",
    id: "trafficController",
    label: "Traffic Controller",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "THS Operator",
    id: "thsOperator",
    label: "THS Operator",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "Plant Operator",
    id: "plantOperator",
    label: "Plant Operator",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "High Risk License",
    id: "highRiskLicense",
    label: "High Risk License (HRWL)",
    type: "text",
    autoComplete: "",
  },
  {
    required: "",
    name: "Other",
    id: "other",
    label: "Other",
    type: "text",
    autoComplete: "",
  },
]

export function WorkerForm({ uid }: { uid: string }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterWorkerFormDefaultValues>({ defaultValues: RegisterWorkerFormDefaultValues })

  const onSubmit = async (values: TRegisterWorkerFormDefaultValues) => {
    try {
      await updateDocument("users", uid, values)
      router.push("/dashboard")
      toast.success("Client details submitted successfully")
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Role role="worker"> */}
      <div className="space-y-8 divide-y divide-gray-200">
        <FormSectionHeading
          title="Additional Documents"
          description="More documents to verify your account"
        />

        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
          {/* White Card */}
          <Disclosure as="div" className="pt-6">
            {({ open }) => (
              <>
                <dt>
                  <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base font-semibold leading-7">White Card</span>
                    <span className="ml-6 flex h-7 items-center">
                      {open ? (
                        <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </dt>

                <Disclosure.Panel as="dd" className="mt-2">
                  <p className="text-base leading-7 text-gray-600">
                    <div className="sm:col-span-6">
                      <label htmlFor="whiteCardNumber">Number</label>
                      <input
                        type="text"
                        {...register("whiteCardNumber", {
                          required: false,
                        })}
                      />
                      {errors["whiteCardNumber"] && (
                        <span>{String(errors["whiteCardNumber"]?.message)}</span>
                      )}

                      <div className="mt-2">
                        <label htmlFor="dateIssued">Date of Issue</label>
                        <input
                          type="date"
                          {...register("whiteCardIssueDate", {
                            required: false,
                          })}
                        />
                        {errors["whiteCardIssueDate"] && (
                          <span>{String(errors["whiteCardIssueDate"]?.message)}</span>
                        )}
                      </div>

                      <button
                        type="button"
                        className="relative mt-2 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <div className="flex flex-col content-center items-center justify-center">
                          <DocumentArrowUpIcon className="h-12 w-12 text-gray-400" />
                          <span className="mt-2 block text-sm font-semibold text-gray-900">
                            Upload Image
                          </span>
                        </div>
                      </button>
                    </div>
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {documentsForm.map((field, index) => (
            <Disclosure key={field.label} as="div" className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">{field.label}</span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                        ) : (
                          <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>

                  <Disclosure.Panel as="dd" className="mt-2">
                    <p className="text-base leading-7 text-gray-600">
                      <div key={index} className="sm:col-span-6">
                        {field.id === "other" && (
                          <div className="mt-2">
                            <label htmlFor={field.id}>License Name</label>
                            <input
                              type={field.type}
                              autoComplete={field.autoComplete}
                              {...register(field.id, {
                                required: field.required,
                              })}
                            />
                            {errors[field.id] && <span>{String(errors[field.id]?.message)}</span>}
                          </div>
                        )}

                        <div className="mt-2">
                          <label htmlFor={field.id}>Number</label>
                          <input
                            type={field.type}
                            autoComplete={field.autoComplete}
                            {...register(field.id, {
                              required: field.required,
                            })}
                          />
                          {errors[field.id] && <span>{String(errors[field.id]?.message)}</span>}
                        </div>

                        <div className="mt-2">
                          <label htmlFor={field.id}>Class / Type</label>
                          <input
                            type="text"
                            autoComplete={field.autoComplete}
                            {...register(field.id, {
                              required: field.required,
                            })}
                          />
                          {errors[field.id] && <span>{String(errors[field.id]?.message)}</span>}
                        </div>

                        <div className="flex gap-2">
                          <div className="mt-2 w-full">
                            <label htmlFor={field.id}>Date of Issue</label>
                            <input
                              type="date"
                              autoComplete={field.autoComplete}
                              {...register(field.id, {
                                required: field.required,
                              })}
                            />
                            {errors[field.id] && <span>{String(errors[field.id]?.message)}</span>}
                          </div>

                          <div className="mt-2 w-full">
                            <label htmlFor={field.id}>Expire Date</label>
                            <input
                              type="date"
                              autoComplete={field.autoComplete}
                              {...register(field.id, {
                                required: field.required,
                              })}
                            />
                            {errors[field.id] && <span>{String(errors[field.id]?.message)}</span>}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="relative mt-2 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <div className="flex flex-col content-center items-center justify-center">
                            <DocumentArrowUpIcon className="h-12 w-12 text-gray-400" />
                            <span className="mt-2 block text-sm font-semibold text-gray-900">
                              Upload Image
                            </span>
                          </div>
                        </button>
                      </div>
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>

      <Divider />

      {/* Qualifications */}
      <div>
        <FormSectionHeading title="Qualifications" description="Add your qualifications" />
        <WordInputChips setValue={setValue} />
      </div>
      {/* </Role> */}

      <CardFooter>
        <Button disabled={isSubmitting || !isDirty}>
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </CardFooter>
    </form>
  )
}

function WordInputChips({ setValue }: { setValue: UseFormReturn<any>["setValue"] }) {
  const [inputValue, setInputValue] = useState("")
  const [words, setWords] = useState<string[]>([])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      setWords([...words, inputValue.trim()])
      setValue("qualifications", [...words, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleChipRemove = (index: number) => {
    const updatedWords = [...words]
    updatedWords.splice(index, 1)
    setWords(updatedWords)
    setValue("qualifications", updatedWords)
  }

  return (
    <div className="mt-6 flex flex-wrap">
      {words.map((word, index) => (
        <div key={index} className="m-1 flex items-center rounded-full bg-gray-200 px-3 py-1">
          <span>{word}</span>
          <button
            onClick={() => handleChipRemove(index)}
            className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        className="m-1 rounded border border-gray-300 px-3 py-1"
        placeholder="Enter words"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  )
}
