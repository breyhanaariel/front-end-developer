import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../../src/components/Header'
import Footer from '../../src/components/Footer'
import { useCartStore } from '../../src/store/useCartStore'
import type { Product } from '../../src/types'

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState<Product | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading')
  const add = useCartStore((state) => state.add)

  useEffect(() => {
    if (!id) return
    fetch('/api/products')
      .then((response) => response.json())
      .then((products: Product[]) => {
        const found = products.find((item) => item.id === id)
        if (found) {
          setProduct(found)
          setStatus('ready')
        } else {
          setStatus('missing')
        }
      })
      .catch(() => setStatus('missing'))
  }, [id])

  return (
    <>
      <Head><title>{product ? product.name + ' | Aura & Ambiance' : 'Product | Aura & Ambiance'}</title></Head>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-14">
        {status === 'loading' && <p>Loading product…</p>}
        {status === 'missing' && <p role="alert">That product could not be found.</p>}
        {product && (
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <img src={product.image} alt={product.name} className="h-[420px] w-full rounded-3xl object-cover shadow-lg" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-aura-500">{product.category}</p>
              <h1 className="mt-3 text-4xl font-semibold">{product.name}</h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">{product.description}</p>
              <p className="mt-4 text-sm text-slate-500">Scent profile: {product.scent}</p>
              <p className="mt-6 text-3xl font-semibold">{'$'}{product.price.toFixed(2)}</p>
              <button
                type="button"
                onClick={() => add(product)}
                className="mt-6 rounded-full bg-aura-500 px-7 py-3 font-semibold text-white"
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
