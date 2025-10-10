// pages/product/[id].tsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../src/components/Header'
import Footer from '../../src/components/Footer'
import ProductCard from '../../src/components/ProductCard'

type Product = { id: string; name: string; price: number; description?: string; image?: string; category?: string }

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!id) return
    fetch('/api/products').then(r => r.json()).then((ps: Product[]) => {
      const found = ps.find(p => p.id === id)
      if (found) setProduct(found)
    })
  }, [id])

  if (!product) return (
    <>
      <Header />
      <main className="min-h-[70vh] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-600">Loading product…</p>
        </div>
      </main>
      <Footer />
    </>
  )

  return (
    <>
      <Header />
      <main className="min-h-[70vh] py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img src={product.image ?? '/favicon.ico'} alt={product.name} className="rounded-lg object-cover w-full h-64" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <p className="text-slate-600 mt-2">{product.description}</p>
              <div className="mt-4">
                <div className="text-2xl font-bold text-pink-500">${product.price.toFixed(2)}</div>
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('aura-cart-add', { detail: { count: 1 } }))
                    alert('Added to cart (demo widget)')
                  }}
                  className="mt-4 px-4 py-2 rounded bg-pink-500 text-white hover:bg-pink-600"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}