import Head from 'next/head'
import Link from 'next/link'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import { cartSubtotal, useCartStore } from '../src/store/useCartStore'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const remove = useCartStore((state) => state.remove)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const subtotal = cartSubtotal(items)

  return (
    <>
      <Head><title>Your Cart | Aura &amp; Ambiance</title></Head>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-14">
        <h1 className="text-3xl font-semibold">Your cart</h1>
        <p className="mt-2 text-slate-600">Your selections are saved locally between visits.</p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-rose-100 bg-rose-50/50 p-8 text-center">
            <p className="text-slate-600">Your cart is empty.</p>
            <Link href="/#shop" className="mt-4 inline-flex rounded-full bg-aura-500 px-5 py-2 font-semibold text-white">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {items.map((item) => (
                <article key={item.id} className="flex gap-4 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
                  <img src={item.image} alt="" className="h-28 w-28 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-sm text-slate-500">{item.scent}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <label className="text-sm text-slate-600">
                        Qty
                        <input
                          aria-label={'Quantity for ' + item.name}
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(event) => setQuantity(item.id, Number(event.target.value))}
                          className="ml-2 w-16 rounded-lg border border-rose-200 px-2 py-1"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="text-sm font-semibold text-rose-700 hover:underline"
                      >
                        Remove
                      </button>
                      <strong>{'$'}{(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <aside className="h-fit rounded-2xl border border-rose-100 bg-rose-50/60 p-6">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <div className="mt-5 flex justify-between border-b border-rose-100 pb-4">
                <span className="text-slate-600">Subtotal</span>
                <strong>{'$'}{subtotal.toFixed(2)}</strong>
              </div>
              <p className="mt-3 text-xs text-slate-500">This portfolio checkout is simulated. No payment is collected.</p>
              <Link href="/checkout" className="mt-6 flex justify-center rounded-full bg-aura-500 px-5 py-3 font-semibold text-white">
                Continue to checkout
              </Link>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
