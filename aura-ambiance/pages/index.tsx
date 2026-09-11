import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import ProductCard from '../src/components/ProductCard'
import ShopControls from '../src/components/ShopControls'
import { filterAndSortProducts } from '../src/lib/catalog'
import type { Product, SortOption } from '../src/types'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState<SortOption>('featured')
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    fetch('/api/products')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load products')
        return response.json()
      })
      .then((data: Product[]) => {
        setProducts(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))).sort(),
    [products]
  )

  const visibleProducts = useMemo(
    () => filterAndSortProducts(products, query, category, sort),
    [products, query, category, sort]
  )

  return (
    <>
      <Head>
        <title>Aura &amp; Ambiance | Self-Care Storefront</title>
        <meta
          name="description"
          content="A polished self-care storefront prototype with product discovery, persistent cart state, and simulated checkout."
        />
      </Head>
      <Header />

      <main>
        <section className="bg-gradient-to-br from-rose-50 via-white to-indigo-50 py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-aura-500">Soft rituals, thoughtful UX</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
                Self-care shopping without the clutter.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Browse a curated collection, find the right scent, save your cart between visits, and complete a polished checkout flow.
              </p>
              <a
                href="#shop"
                className="mt-7 inline-flex rounded-full bg-aura-500 px-6 py-3 font-semibold text-white shadow-sm hover:opacity-90"
              >
                Shop the collection
              </a>
            </div>
            <div className="rounded-[2rem] border border-rose-100 bg-white/70 p-7 shadow-xl">
              <p className="text-sm font-semibold text-aura-500">Portfolio case study</p>
              <h2 className="mt-2 text-2xl font-semibold">Built for a real retail journey</h2>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                <li>Persistent Zustand cart state</li>
                <li>Search, category filters, and sorting</li>
                <li>Product detail and quantity management</li>
                <li>Accessible checkout form with validation</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-aura-500">Collection</p>
            <h2 className="mt-2 text-3xl font-semibold">Find your next ritual</h2>
          </div>

          <ShopControls
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
            sort={sort}
            onSortChange={setSort}
            categories={categories}
          />

          {status === 'loading' && <p className="py-10 text-slate-600">Loading collection…</p>}
          {status === 'error' && (
            <p role="alert" className="py-10 text-rose-700">The collection could not be loaded. Please refresh and try again.</p>
          )}
          {status === 'ready' && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          {status === 'ready' && visibleProducts.length === 0 && (
            <p className="py-10 text-slate-600">No products match those filters.</p>
          )}
        </section>

        <section id="about" className="border-y border-rose-100 bg-rose-50/50 py-14">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-2xl font-semibold">Designed as a commercial front-end case study</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Aura &amp; Ambiance focuses on the interactions a retail client cares about: discovery, product confidence, cart continuity, and a clear checkout path.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
