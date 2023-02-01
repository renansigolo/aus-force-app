type HeroProps = {
  description: string
}

export function Hero({ description }: HeroProps) {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Welcome to <br />
            AUS Force App
          </h1>
          <p className="py-6">{description}</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  )
}
