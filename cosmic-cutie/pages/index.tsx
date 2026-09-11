import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'
import Header from '../components/Header'
import ChartWidget from '../components/ChartWidget'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchAstronomy } from '../store/celestialSlice'

export default function Home() {
  const dispatch = useAppDispatch()
  const { data, status, error } = useAppSelector((state) => state.celestial)
  const [location, setLocation] = useState('Orlando')
  const [days, setDays] = useState<7 | 14>(7)

  useEffect(() => {
    dispatch(fetchAstronomy({ location: 'Orlando', days: 7 }))
  }, [dispatch])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (location.trim()) {
      dispatch(fetchAstronomy({ location: location.trim(), days }))
    }
  }

  return (
    <>
      <Head>
        <title>Cosmic Cutie | Lunar Data Dashboard</title>
        <meta
          name="description"
          content="An interactive lunar dashboard using real astronomy data, Redux Toolkit, TypeScript, and Chart.js."
        />
      </Head>
      <Header />

      <main className="min-h-screen bg-cosmic-night text-slate-100">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(111,124,255,0.35),_transparent_45%)] py-20">
          <div className="mx-auto max-w-6xl px-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-pink-300">Live astronomy dashboard</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              A cute little window into tonight&apos;s sky.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-indigo-100/80">
              Search any city to explore moon phase, illumination, moonrise, moonset, and upcoming lunar changes from a real astronomy API.
            </p>

            <form onSubmit={submit} className="mt-8 grid max-w-3xl gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur md:grid-cols-[1fr_150px_auto]">
              <label className="sr-only" htmlFor="location">Location</label>
              <input
                id="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City or postal code"
                className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-pink-300"
              />
              <label className="sr-only" htmlFor="range">Date range</label>
              <select
                id="range"
                value={days}
                onChange={(event) => setDays(Number(event.target.value) as 7 | 14)}
                className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
              </select>
              <button
                type="submit"
                className="rounded-xl bg-pink-400 px-6 py-3 font-semibold text-slate-950 hover:bg-pink-300"
              >
                Explore
              </button>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          {status === 'loading' && (
            <div className="cosmic-card" role="status">Reading the sky…</div>
          )}
          {status === 'failed' && (
            <div className="cosmic-card border-rose-300/30 text-rose-100" role="alert">
              <h2 className="font-semibold">The astronomy data could not be loaded.</h2>
              <p className="mt-2 text-sm opacity-80">{error}</p>
            </div>
          )}
          {data && status !== 'loading' && <ChartWidget data={data} />}
        </section>
      </main>
    </>
  )
}
