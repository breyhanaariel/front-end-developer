import React from 'react'

type Product = {
  id: string
  name: string
  price: number
  description?: string
  image?: string
  tags?: string[]
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card flex flex-col md:flex-row gap-4 items-center">
      <img src={p.image ?? '/favicon.ico'} alt={p.name} className="w-24 h-24 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-semibold">{p.name}</h3>
        <p className="text-sm text-slate-600 mt-1">{p.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-pink-600 font-semibold">${p.price.toFixed(2)}</div>
          <button className="px-3 py-1 rounded bg-pink-500 text-white text-sm">Add to Favorites</button>
        </div>
      </div>
    </article>
  )
}
