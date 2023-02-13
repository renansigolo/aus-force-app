import { Providers } from "@/app/aProviders"
import { Inter } from "@next/font/google"
import "./globals.css"

const isProduction = process.env.NODE_ENV === "production"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: {
    default: "AUS Force App",
    template: "AUS Force App | %s",
  },
  applicationName: "AUS Force App",
  description: "AUS Force App",
  authors: ["Renan Sigolo", "Vinicius Turl"],
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
  // appleWebApp: {
  //   title: "AUS Force App",
  //   statusBarStyle: "black-translucent",
  //   startupImage: [
  //     "/assets/startup/apple-touch-startup-image-768x1004.png",
  //     {
  //       url: "/assets/startup/apple-touch-startup-image-1536x2008.png",
  //       media: "(device-width: 768px) and (device-height: 1024px)",
  //     },
  //   ],
  // },
  openGraph: {
    title: "AUS Force App",
    siteName: "AUS Force App",
    description: "AUS Force App",
    url: "https://aus-force-app.vercel.app",
    locale: "en-AU",
    type: "website",
    image: {
      url: "https://aus-force-app.vercel.app/og.png",
      width: 1200,
      height: 627,
      alt: "Open Graph Image",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "AUS Force App",
    description: "AUS Force App",
    creator: "@renan_sigolo",
    creatorId: "23168747",
    image: "https://aus-force-app.vercel.app/og.png",
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
