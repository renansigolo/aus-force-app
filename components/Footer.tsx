const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl overflow-hidden py-20 px-6 sm:py-24 lg:px-8">
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {year} AUS Force, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
