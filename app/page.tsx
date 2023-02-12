"use client"

import { Container } from "@/components/Container"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/home/Hero"
import { Navbar } from "@/components/home/Navbar"
import { Pricing } from "@/components/home/Pricing"

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
