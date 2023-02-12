import { Bars3Icon } from "@heroicons/react/20/solid"

type NavbarTopProps = {
  setSidebarOpen: (value: boolean) => void
}

export function NavbarTop({ setSidebarOpen }: NavbarTopProps) {
  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 justify-between px-4 md:px-0">
        {/* TOP NAVIGATION HERE */}
      </div>
    </div>
  )
}
