// pages/index.tsx
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import ProductCard from '../src/components/ProductCard'
import VueFilterLoader from '../src/components/VueFilterLoader'
import CartWidgetLoader from '../src/components/CartWidgetLoader'

type Product = {
  id: string; name: string; price: number; image?: string; category?: string; description?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [category, setCategory] = useState<string>('all')

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then((p: Product[]) => { setProducts(p); setFiltered(p) })
  }, [])

  useEffect(() => {
    function onFilter(e: CustomEvent) {
      const cat = e.detail?.category ?? 'all'
      setCategory(cat)
      setFiltered(cat === 'all' ? products : products.filter(x => x.category === cat))
    }
    window.addEventListener('aura-filter', onFilter as EventListener)
    return () => window.removeEventListener('aura-filter', onFilter as EventListener)
  }, [products])

  return (
    <>
      <Head>
        <title>Aura & Ambiance — Demo Storefront</title>
        <meta name="description" content="Portfolio showcase storefront built with Next.js + TypeScript + Tailwind" />
      </Head>

      <Header />
      <main className="min-h-[70vh] py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold">Featured Products</h2>
              <p className="text-slate-600 mt-1">Responsive UI, accessible markup, and modular components.</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>

            <aside>
              <div className="card mb-4">
                <h3 className="font-semibold mb-2">Shop Filters</h3>
                <VueFilterLoader />
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">Cart</h3>
                <CartWidgetLoader />
                <p className="mt-2 text-sm text-slate-600">Micro-widget demonstrates Svelte-like micro-interactions.</p>
              </div>
            </aside>
          </section>

          <section className="card">
            <h3 className="font-semibold mb-2">About this Project</h3>
            <p className="text-sm text-slate-600">A portfolio-ready storefront demonstrating Next.js + TypeScript + Tailwind. It includes tiny cross-framework widgets (Vue-like and Svelte-like) built as web components to show your ability to integrate mixed tech without heavy builds.</p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}