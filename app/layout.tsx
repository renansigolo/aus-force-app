import { Providers } from "@/app/Providers"
import { UserContextProvider } from "@/app/UserContext"
import { Badge } from "@/components/Badge"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import "../lib/firebase"
import packageJson from "../package.json"
import "./globals.css"

const isProduction = process.env.NODE_ENV === "production"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata = {
  metadataBase: new URL("https://aus-force-app.vercel.app"),
  title: {
    default: "AUS Force App",
    template: "AUS Force App | %s",
  },
  applicationName: "AUS Force App",
  description: "AUS Force App",
  authors: [{ name: "Renan Sigolo", url: "https://renansigolo.com" }],
  creator: "Renan Sigolo",
  colorScheme: "light",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  robots: {
    index: isProduction,
    follow: isProduction,
  },
  appleWebApp: {
    title: "AUS Force App",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "AUS Force App",
    siteName: "AUS Force App",
    description: "AUS Force App",
    url: "https://aus-force-app.vercel.app",
    locale: "en-AU",
    type: "website",
    images: {
      url: "https://aus-force-app.vercel.app/og.png",
      width: 1200,
      height: 627,
      alt: "Open Graph Image",
    },
  },
  twitter: {
    title: "AUS Force App",
    description: "AUS Force App",
    creator: "@renan_sigolo",
    creatorId: "23168747",
    images: "https://aus-force-app.vercel.app/og.png",
  },
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <Providers>
          <UserContextProvider>
            <div className="fixed bottom-1 left-1">
              <Badge>v.{packageJson.version}</Badge>
            </div>

            {children}
            <Toaster position="top-right" reverseOrder={true} />
          </UserContextProvider>
        </Providers>
      </body>
    </html>
  )
}
