import Link from "next/link"

export function Hero() {
  return (
    <div className="grid min-h-[70vh] place-content-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Ready to use
          <br />
          AUS Force App?
        </h2>
        <p className="my-6 text-lg leading-8 text-gray-600">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
          Elit sunt amet fugiat veniam occaecat fugiat aliqua.
        </p>
        <Link href="/log-in" className="btn btn-primary btn-xl">
          Get Started
        </Link>
      </div>
    </div>
  )
}
