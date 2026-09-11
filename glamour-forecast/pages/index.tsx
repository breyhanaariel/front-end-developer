import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import WeatherCard from '../components/WeatherCard'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../lib/api'
import { useStore } from '../store/useStore'

export default function Home() {
  const products = useStore((state) => state.products)
  const setProducts = useStore((state) => state.setProducts)
  const favoriteIds = useStore((state) => state.favoriteIds)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [setProducts])

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))).sort(),
    [products]
  )

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesQuery =
        !normalized ||
        product.name.toLowerCase().includes(normalized) ||
        product.brand.toLowerCase().includes(normalized) ||
        product.tags.some((tag) => tag.toLowerCase().includes(normalized))
      const matchesCategory = category === 'all' || product.category === category
      const matchesFavorite = !favoritesOnly || favoriteIds.includes(product.id)
      return matchesQuery && matchesCategory && matchesFavorite
    })
  }, [products, query, category, favoritesOnly, favoriteIds])

  return (
    <>
      <Head>
        <title>Glamour Forecast | Weather-Powered Beauty Discovery</title>
        <meta
          name="description"
          content="A front-end portfolio app combining live weather data with beauty product discovery and saved favorites."
        />
      </Head>

      <Header />

      <main>
        <section className="bg-gradient-to-br from-pink-50 via-white to-violet-50 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink-500">Weather meets beauty</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
              Build a beauty routine for the day you&apos;re actually having.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Glamour Forecast combines live local weather with rule-based beauty guidance and an external beauty catalog you can search, filter, and save.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          <WeatherCard />
        </section>

        <section id="products" className="mx-auto max-w-6xl px-4 pb-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-500">Beauty catalog</p>
              <h2 className="mt-2 text-3xl font-semibold">Discover products</h2>
              <p className="mt-2 text-sm text-slate-600">Live beauty and skin-care data provided through DummyJSON.</p>
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={favoritesOnly}
                onChange={(event) => setFavoritesOnly(event.target.checked)}
                className="h-4 w-4 accent-pink-500"
              />
              Favorites only
            </label>
          </div>

          <div className="mt-6 grid gap-3 rounded-2xl border border-pink-100 bg-pink-50/40 p-4 md:grid-cols-[1fr_220px]">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Search
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Product, brand, or tag"
                className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm normal-case tracking-normal outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />
            </label>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Category
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm normal-case tracking-normal outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              >
                <option value="all">All categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          {status === 'loading' && <p className="py-10 text-slate-500" role="status">Loading beauty catalog…</p>}
          {status === 'error' && <p className="py-10 text-rose-700" role="alert">The product catalog could not be loaded.</p>}
          {status === 'ready' && (
            <>
              <p className="mt-6 text-sm text-slate-500">{visibleProducts.length} products shown</p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {visibleProducts.length === 0 && (
                <div className="mt-8 rounded-2xl border border-pink-100 bg-pink-50/40 p-8 text-center text-slate-600">
                  No products match those filters yet.
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <footer className="border-t border-pink-100 bg-pink-50/40 py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-600">
          © {new Date().getFullYear()} Glamour Forecast — portfolio API integration case study.
        </div>
      </footer>
    </>
  )
}
