import "@/styles/globals.css"
import { trpc } from "@/utils/trpc"
import { Inter } from "@next/font/google"
import type { AppProps } from "next/app"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </div>
  )
}

export default trpc.withTRPC(App)
