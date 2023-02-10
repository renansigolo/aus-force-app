import { Providers } from "@/app/providers"
import { Inter } from "@next/font/google"
import { ReactNode } from "react"
import "./globals.css"

type RootLayoutProps = {
  children: ReactNode
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>{children}</body>
      <Providers />
    </html>
  )
}
