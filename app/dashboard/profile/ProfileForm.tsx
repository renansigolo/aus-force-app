"use client"

import { CurrentUserProfile } from "@/app/dashboard/profile/page"
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
  } = useForm<CurrentUserProfile>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      dob: user.dob,
      email: user.email,
    },
  })

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
    <>
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
                  new Date(value) <
                    new Date(new Date().setFullYear(new Date().getFullYear() - 18)) ||
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
        </div>

        <div className="mt-8 flex">
          <button type="submit" className="btn btn-primary">
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </form>

      {/* <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Change password</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Update your password associated with your account.
          </p>
        </div>

        <form className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="current-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  autoComplete="current-password"
                  {...register("currentPassword", {
                    required: "Current password is required",
                    // validate: (value) =>
                    //   value === currentUser.Password || "Passwords do not match",
                  })}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  autoComplete="new-password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === getValues("newPassword") || "Passwords do not match",
                  })}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div> */}
    </>
  )
}
