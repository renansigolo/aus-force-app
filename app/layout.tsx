import { Inter } from "@next/font/google"
import { ReactNode } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>{children}</body>
      {/* <Providers /> */}
    </html>
  )
}
