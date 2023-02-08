import { Container } from "@/components/Container"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { Loader } from "@/components/Loader"
import { Pricing } from "@/components/Pricing"
import { trpc } from "@/utils/trpc"
import { Inter } from "@next/font/google"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export default function Home() {
  const { data } = trpc.hello.useQuery({ text: "AUS Force App" })
  if (!data) {
    return <Loader show />
  }

  return (
    <>
      <Head>
        <title>AUS Force App</title>
        <meta name="description" content="AUS Force app" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inter.className}>
        <Container>
          <Hero description={data.greeting} />
          <Pricing />
          <Footer />
        </Container>
      </main>
    </>
  )
}
