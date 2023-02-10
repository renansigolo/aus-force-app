import Link from "next/link"

type HeroProps = {
  description?: string
}

export function Hero({ description = "Hello" }: HeroProps) {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Ready to use <br />
            AUS Force?
          </h1>
          <p className="py-6">{description}</p>
          <Link href="/sign-in">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
