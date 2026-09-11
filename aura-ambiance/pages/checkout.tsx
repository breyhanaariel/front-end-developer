import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import { cartSubtotal, useCartStore } from '../src/store/useCartStore'
import type { CheckoutFields } from '../src/types'

const initialFields: CheckoutFields = {
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: ''
}

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const clear = useCartStore((state) => state.clear)
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFields, string>>>({})
  const [orderNumber, setOrderNumber] = useState('')
  const subtotal = cartSubtotal(items)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Partial<Record<keyof CheckoutFields, string>> = {}

    if (fields.name.trim().length < 2) nextErrors.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) nextErrors.email = 'Enter a valid email address.'
    if (fields.address.trim().length < 5) nextErrors.address = 'Enter a street address.'
    if (fields.city.trim().length < 2) nextErrors.city = 'Enter a city.'
    if (fields.postalCode.trim().length < 4) nextErrors.postalCode = 'Enter a postal code.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setOrderNumber('AURA-' + Date.now().toString().slice(-6))
    clear()
  }

  if (orderNumber) {
    return (
      <>
        <Head><title>Order Complete | Aura &amp; Ambiance</title></Head>
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="rounded-3xl border border-rose-100 bg-rose-50/60 p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-aura-500">Demo order complete</p>
            <h1 className="mt-3 text-3xl font-semibold">Your ritual is reserved.</h1>
            <p className="mt-4 text-slate-600">Confirmation #{orderNumber}</p>
            <p className="mt-2 text-sm text-slate-500">No payment or personal information was transmitted; this is a front-end portfolio simulation.</p>
            <Link href="/#shop" className="mt-7 inline-flex rounded-full bg-aura-500 px-6 py-3 font-semibold text-white">
              Continue shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head><title>Checkout | Aura &amp; Ambiance</title></Head>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-14">
        <h1 className="text-3xl font-semibold">Checkout</h1>
        <p className="mt-2 text-slate-600">A simulated checkout flow for this portfolio project.</p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-rose-100 bg-rose-50/50 p-8">
            <p>Your cart is empty.</p>
            <Link href="/#shop" className="mt-4 inline-flex font-semibold text-aura-500 hover:underline">Return to shop</Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            <form onSubmit={submit} noValidate className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Delivery details</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {([
                  ['name', 'Full name', 'text'],
                  ['email', 'Email', 'email'],
                  ['address', 'Street address', 'text'],
                  ['city', 'City', 'text'],
                  ['postalCode', 'Postal code', 'text']
                ] as const).map(([key, label, type]) => (
                  <label key={key} className={key === 'address' ? 'sm:col-span-2' : ''}>
                    <span className="text-sm font-medium">{label}</span>
                    <input
                      type={type}
                      value={fields[key]}
                      onChange={(event) => setFields({ ...fields, [key]: event.target.value })}
                      aria-invalid={Boolean(errors[key])}
                      aria-describedby={errors[key] ? key + '-error' : undefined}
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 outline-none focus:border-aura-500 focus:ring-2 focus:ring-rose-100"
                    />
                    {errors[key] && <span id={key + '-error'} className="mt-1 block text-sm text-rose-700">{errors[key]}</span>}
                  </label>
                ))}
              </div>
              <button className="mt-7 rounded-full bg-aura-500 px-6 py-3 font-semibold text-white" type="submit">
                Place demo order
              </button>
            </form>

            <aside className="h-fit rounded-2xl border border-rose-100 bg-rose-50/60 p-6">
              <h2 className="font-semibold">Summary</h2>
              <div className="mt-4 space-y-3 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3">
                    <span className="text-slate-600">{item.name} × {item.quantity}</span>
                    <span>{'$'}{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-between border-t border-rose-100 pt-4 text-lg">
                <strong>Total</strong>
                <strong>{'$'}{subtotal.toFixed(2)}</strong>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
