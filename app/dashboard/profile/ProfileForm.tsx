"use client"

import { CurrentUserProfile } from "@/app/dashboard/profile/page"
import { Button } from "@/components/Button"
import { UserAvatar } from "@/components/User"
import { updateDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type ProfileFormProps = {
  user: CurrentUserProfile
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CurrentUserProfile>({ defaultValues: user })

  const onSubmit = async (values: CurrentUserProfile) => {
    try {
      await updateDocument("users", user.uid, values)
      router.refresh()
      toast.success("Profile details submitted successfully")
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div className="col-span-full flex items-center gap-x-8">
          <UserAvatar />
          {/* <div>
              <button type="button" className="btn btn-primary">
                Change avatar
              </button>
              <p className="mt-2 text-xs leading-5 text-gray-500">JPG, or PNG. 1MB max.</p>
            </div> */}
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="firstName" className="form-label">
            First name
          </label>
          <input
            disabled
            type="text"
            autoComplete="given-name"
            {...register("firstName", { required: "First name is required" })}
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="lastName" className="form-label">
            Last name
          </label>
          <input
            disabled
            type="text"
            autoComplete="family-name"
            {...register("lastName", { required: "Last name is required" })}
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone number
          </label>
          <input
            type="tel"
            autoComplete="tel"
            disabled={isSubmitting}
            {...register("phoneNumber", { required: "Phone number is required" })}
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="dob" className="form-label">
            Date of birthday
          </label>
          <input
            type="date"
            autoComplete="bday"
            disabled={isSubmitting}
            {...register("dob", {
              required: "Date of birthday is required",
              validate: (value) =>
                new Date(value) < new Date(new Date().setFullYear(new Date().getFullYear() - 18)) ||
                "You must be at least 18 years old",
            })}
          />
        </div>

        {/* <div className="col-span-full">
            <label htmlFor="email" className="form-label">
              Job title
            </label>
            <input
              type="text"
              autoComplete="organization-title"
              {...register("jobTitle", { required: "Job title is required" })}
            />
          </div> */}

        <div className="col-span-full">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            {...register("email", { required: "Email is required" })}
          />
        </div>

        <div className="col-span-full">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select {...register("role")} className="capitalize">
            <option>worker</option>
            <option>client</option>
            <option>business</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </Button>
      </div>
    </form>
  )
}
