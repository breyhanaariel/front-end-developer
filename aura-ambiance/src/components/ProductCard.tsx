import Link from 'next/link'
import type { Product } from '../types'
import { useCartStore } from '../store/useCartStore'

export default function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((state) => state.add)

  return (
    <article className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={product.image}
        alt=""
        className="h-56 w-full object-cover"
        loading="lazy"
      />
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-aura-500">{product.category}</p>
            <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>
          </div>
          <span className="font-semibold text-slate-900">{'$'}{product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-slate-600">{product.description}</p>
        <p className="mt-2 text-xs text-slate-500">Scent: {product.scent}</p>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => add(product)}
            className="flex-1 rounded-full bg-aura-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-aura-500 focus:ring-offset-2"
          >
            Add to cart
          </button>
          <Link
            href={'/product/' + product.id}
            className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-rose-50"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  )
}
