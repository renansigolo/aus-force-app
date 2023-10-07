import { z } from "zod"

export type SearchParams = { [key: string]: string | string[] | undefined }

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
export type TLoginFormSchema = z.infer<typeof LoginFormSchema>

// export const RegisterFormSchema = z
//   .object({
//     profileImage: z.string().url().optional(),

//     firstName: z.string(),
//     lastName: z.string(),
//     phone: z.string(),
//     dob: z.string(),

//     passportNumber: z.string().optional(),
//     passportIssued: z.string().optional(),
//     passportExpiry: z.string().optional(),

//     email: z.string().email(),
//     password: z.string().min(6),
//     confirmPassword: z.string().min(6),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   })
// export type TRegisterFormSchema = z.infer<typeof RegisterFormSchema>
export const RegisterFormDefaultValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dob: "",
  profileImageFile: null,
  passportNumber: "",
  passportIssued: "",
  passportExpiry: "",
  passportImageFile: null,
  driverLicenseNumber: "",
  driverLicenseIssued: "",
  driverLicenseExpiry: "",
  driverLicenseImageFile: null,
  identificationNumber: "",
  identificationIssued: "",
  identificationExpiry: "",
  identificationImageFile: null,
  email: "",
  password: "",
  confirmPassword: "",
}
export type TRegisterFormSchema = {
  profileImageFile: FileList | null
  firstName: string
  lastName: string
  phoneNumber: string
  dob: string
  passportNumber?: string
  passportIssued?: string
  passportExpiry?: string
  passportImageFile?: FileList | null
  driverLicenseNumber?: string
  driverLicenseIssued?: string
  driverLicenseExpiry?: string
  driverLicenseImageFile?: FileList | null
  identificationNumber?: string
  identificationIssued?: string
  identificationExpiry?: string
  identificationImageFile?: FileList | null
  email: string
  newPassword: string
  confirmPassword: string
  signatureFile: Blob | null
}

export const RegisterBusinessFormDefaultValues = {
  cardName: "",
  cardNumber: "",
  cardExpire: "",
  cardCvc: undefined,
  planId: "basic",
  planFrequency: "montlhy",
}
export type TRegisterBusinessFormDefaultValues = {
  cardName: string
  cardNumber: string
  cardExpire: string
  cardCvc: number | undefined
  planId: string
  planFrequency: string
}

export const RegisterClientFormDefaultValues = {
  legalName: "",
  tradingName: "",
  abn: undefined,
  acn: undefined,
  country: "",
  state: "",
  city: "",
  street: "",
  postcode: "",
}
export type TRegisterClientFormDefaultValues = {
  legalName: string
  tradingName: string
  abn: number | undefined
  acn: number | undefined
  country: string
  state: string
  city: string
  street: string
  postcode: string
}

export const RegisterWorkerFormDefaultValues = {
  // qualifications: [],
}
export type TRegisterWorkerFormDefaultValues = DocumentIds & {
  qualifications: string[]
  whiteCardNumber: string
  whiteCardIssueDate: string
  whiteCardImageFile: FileList | null
}
type DocumentIds = {
  [key: string]: {
    name: string
    number: string
    category: string
    issuedAt: string
    expireAt: string
    imageFile: FileList | null
  }
}
