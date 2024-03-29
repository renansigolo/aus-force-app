"use client"

import { DatabaseUser } from "@/app/dashboard/profile/page"
import { Button } from "@/components/Button"
import { UserAvatar } from "@/components/User"
import { updateDocument } from "@/lib/firebase"
import { showErrorMessage } from "@/lib/helpers"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type ProfileFormProps = {
  user: DatabaseUser
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<DatabaseUser>({ defaultValues: user })

  const onSubmit = async (values: DatabaseUser) => {
    try {
      await updateDocument("users", user.uid, values)
      // Refresh the page if the user's role has changed to update the AuthContext
      user.role !== values.role ? window.location.reload() : router.refresh()
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
          <label htmlFor="firstName">First name</label>
          <input
            disabled
            id="firstName"
            type="text"
            autoComplete="given-name"
            {...register("firstName", { required: "First name is required" })}
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="lastName">Last name</label>
          <input
            disabled
            id="lastName"
            type="text"
            autoComplete="family-name"
            {...register("lastName", { required: "Last name is required" })}
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            id="phoneNumber"
            type="tel"
            autoComplete="tel"
            disabled={isSubmitting}
            {...register("phoneNumber", { required: "Phone number is required" })}
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="dob">Date of birthday</label>
          <input
            id="dob"
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
            <label htmlFor="email" >
              Job title
            </label>
            <input
              type="text"
              autoComplete="organization-title"
              {...register("jobTitle", { required: "Job title is required" })}
            />
          </div> */}

        <div className="col-span-full">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            {...register("email", { required: "Email is required" })}
          />
        </div>

        <div className="col-span-full">
          <label htmlFor="role">Role</label>
          <select id="role" {...register("role")} className="capitalize">
            <option>worker</option>
            <option>client</option>
            <option>business</option>
            <option>admin</option>
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
