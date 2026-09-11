import Link from 'next/link'
import { cartItemCount, useCartStore } from '../store/useCartStore'

export default function Header() {
  const items = useCartStore((state) => state.items)
  const count = cartItemCount(items)

  return (
    <header className="sticky top-0 z-20 border-b border-rose-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link href="/" className="text-xl font-semibold tracking-wide text-aura-500">
          Aura &amp; Ambiance
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-4 text-sm text-slate-600">
          <Link href="/#shop" className="hover:text-aura-500">Shop</Link>
          <Link href="/#about" className="hover:text-aura-500">About</Link>
          <Link
            href="/cart"
            className="rounded-full bg-rose-50 px-3 py-2 font-medium text-aura-500 hover:bg-rose-100"
            aria-label={'Cart with ' + count + ' items'}
          >
            Cart ({count})
          </Link>
        </nav>
      </div>
    </header>
  )
}
