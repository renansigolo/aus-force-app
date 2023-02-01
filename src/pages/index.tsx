import { Container } from "@/components/Container"
import { Hero } from "@/components/Hero"
import { trpc } from "@/utils/trpc"
import { Inter } from "@next/font/google"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export default function Home() {
  const { data } = trpc.hello.useQuery({ text: "AUS Force App" })
  if (!data) {
    return <div>Loading...</div>
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
          <h1>{data.greeting}</h1>
          <Hero description={data.greeting} />
        </Container>
      </main>
    </>
  )
}
