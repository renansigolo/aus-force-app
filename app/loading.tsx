import { Loader } from "@/components/Loader"

export default function Loading() {
  return (
    <section className="h-screen grid place-content-center">
      <Loader show />
    </section>
  )
}
