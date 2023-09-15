import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty().min(6),
})
export type TLoginFormSchema = z.infer<typeof LoginFormSchema>

export const RegisterFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.number(),
  email: z.string().email(),
  dob: z.number(),
  password: z.string().nonempty().min(6),
})
export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>
