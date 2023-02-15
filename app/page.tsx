import { Container } from "@/components/Container"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/home/Hero"
import { Pricing } from "@/components/home/Pricing"

export default function HomePage() {
  return (
    <Container>
      <Hero />
      <Pricing />
      <Footer />
    </Container>
  )
}
