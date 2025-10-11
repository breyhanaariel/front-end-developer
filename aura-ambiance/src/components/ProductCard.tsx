// src/components/ProductCard.tsx
import React from 'react'
import Link from 'next/link'

type Product = { id: string; name: string; price: number; image?: string; description?: string }

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img src={product.image ?? '/favicon.ico'} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-slate-600 text-sm mt-1">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-pink-600 font-bold">${product.price.toFixed(2)}</div>
        <div className="space-x-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('aura-cart-add', { detail: { count: 1 } }))}
            className="px-3 py-1 rounded bg-pink-500 text-white text-sm"
          >
            Add
          </button>
          <Link href={`/product/${product.id}`}><a className="text-sm text-slate-600 hover:underline">Details</a></Link>
        </div>
      </div>
    </article>
  )
}