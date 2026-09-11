import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-pink-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link href="/" className="text-xl font-semibold text-pink-600">Glamour Forecast</Link>
        <nav aria-label="Primary navigation" className="flex gap-4 text-sm text-slate-600">
          <a className="hover:text-pink-600" href="#weather">Forecast</a>
          <a className="hover:text-pink-600" href="#products">Products</a>
        </nav>
      </div>
    </header>
  )
}
