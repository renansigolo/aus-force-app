import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty().min(6),
})
export type TLoginFormSchema = z.infer<typeof LoginFormSchema>

export const RegisterFormSchema = z
  .object({
    profileImage: z.string().url().optional(),

    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    dob: z.string(),

    passportNumber: z.string().optional(),
    passportIssued: z.string().optional(),
    passportExpiry: z.string().optional(),

    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
// export type TRegisterFormSchema = z.infer<typeof RegisterFormSchema>
export type TRegisterFormSchema = {
  profileImage?: string
  firstName: string
  lastName: string
  phone: string
  dob: string
  passportNumber?: string
  passportIssued?: string
  passportExpiry?: string
  email: string
  password: string
  confirmPassword: string
}
