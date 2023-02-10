"use client"

import { Container } from "@/components/Container"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { Navbar } from "@/components/Navbar"
import { Pricing } from "@/components/Pricing"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Hero />
          <Pricing />
          <Footer />
        </Container>
      </main>
    </>
  )
}
