import React, { useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import WeatherCard from '../components/WeatherCard'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../lib/api'
import { useStore } from '../store/useStore'

export default function Home() {
  const products = useStore((s) => s.products)
  const setProducts = useStore((s) => s.setProducts)

  useEffect(() => {
    let mounted = true
    async function loadProducts() {
      try {
        const list = await fetchProducts()
        if (mounted) setProducts(list)
      } catch (e) {
        console.error(e)
      }
    }
    loadProducts()
    return () => { mounted = false }
  }, [setProducts])

  return (
    <>
      <Head>
        <title>Glamour Forecast</title>
        <meta name="description" content="Weather-driven beauty tips and product discovery" />
      </Head>

      <Header />

      <main className="min-h-[70vh] py-10">
        <div className="max-w-5xl mx-auto px-4">
          <section className="mb-8">
            <h2 className="text-lg font-medium">Welcome</h2>
            <p className="text-slate-600 mt-2">Personalized beauty recommendations based on weather and trending products.</p>
          </section>

          <WeatherCard />

          <section id="products" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Recommended Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products ? products.map((p: any) => <ProductCard key={p.id} p={p} />) : <p>Loading products…</p>}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4 text-sm text-slate-600">
          © {new Date().getFullYear()} Glamour Forecast — Demo project
        </div>
      </footer>
    </>
  )
}
