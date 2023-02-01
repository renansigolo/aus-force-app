import { Container } from "@/components/Container"
import { Hero } from "@/components/Hero"
import { Inter } from "@next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export default function Home() {
  return (
    <>
      <main className={inter.className}>
        <Container>
          <Hero />
        </Container>
      </main>
    </>
  )
}
