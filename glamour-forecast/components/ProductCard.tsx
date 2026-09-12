import type { Product } from '../types'
import { useStore } from '../store/useStore'

export default function ProductCard({ product }: { product: Product }) {
  const favoriteIds = useStore((state) => state.favoriteIds)
  const toggleFavorite = useStore((state) => state.toggleFavorite)
  const isFavorite = favoriteIds.includes(product.id)

  return (
    <article className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative bg-pink-50">
        <img src={product.image} alt={product.name} className="h-52 w-full object-contain p-4" loading="lazy" />
        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-pressed={isFavorite}
          aria-label={(isFavorite ? 'Remove ' : 'Save ') + product.name + (isFavorite ? ' from favorites' : ' to favorites')}
          className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-pink-600 shadow"
        >
          {isFavorite ? '♥ Saved' : '♡ Save'}
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-pink-500">{product.category}</p>
            <h3 className="mt-1 font-semibold">{product.name}</h3>
            <p className="mt-1 text-xs text-slate-500">{product.brand}</p>
          </div>
          <strong>{'$'}{product.price.toFixed(2)}</strong>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
        <p className="mt-3 text-xs font-medium text-amber-700">★ {product.rating.toFixed(1)}</p>
      </div>
    </article>
  )
}
