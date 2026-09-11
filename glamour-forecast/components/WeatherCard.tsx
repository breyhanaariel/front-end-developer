import { FormEvent, useEffect, useState } from 'react'
import { fetchWeather } from '../lib/api'
import { buildBeautyTip } from '../lib/recommendations'
import { useStore } from '../store/useStore'

export default function WeatherCard() {
  const location = useStore((state) => state.location)
  const weather = useStore((state) => state.weather)
  const setLocation = useStore((state) => state.setLocation)
  const setWeather = useStore((state) => state.setWeather)
  const [query, setQuery] = useState(location)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setStatus('loading')
    fetchWeather(location)
      .then((data) => {
        if (!active) return
        setWeather(data)
        setStatus('ready')
      })
      .catch((reason: Error) => {
        if (!active) return
        setError(reason.message)
        setStatus('error')
      })

    return () => {
      active = false
    }
  }, [location, setWeather])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextLocation = query.trim()
    if (nextLocation) setLocation(nextLocation)
  }

  const tip = weather ? buildBeautyTip(weather) : null

  return (
    <section id="weather" className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-xl md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-500">Weather-powered routine</p>
          <h2 className="mt-2 text-2xl font-semibold">Beauty forecast</h2>
          <p className="mt-2 text-sm text-slate-600">
            Search a city and get a beauty-prep suggestion based on live temperature, humidity, UV, and conditions.
          </p>
        </div>

        <form onSubmit={submit} className="flex w-full max-w-md gap-2">
          <label htmlFor="glamour-location" className="sr-only">City or postal code</label>
          <input
            id="glamour-location"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="City or postal code"
            className="min-w-0 flex-1 rounded-full border border-pink-200 px-4 py-2 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
          />
          <button type="submit" className="rounded-full bg-pink-500 px-5 py-2 font-semibold text-white hover:bg-pink-600">
            Update
          </button>
        </form>
      </div>

      {status === 'loading' && <p className="mt-8 text-slate-500" role="status">Checking the forecast…</p>}
      {status === 'error' && <p className="mt-8 text-rose-700" role="alert">{error}</p>}

      {weather && status !== 'loading' && (
        <div className="mt-8 grid gap-5 lg:grid-cols-[220px_1fr]">
          <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-violet-50 p-5">
            <div className="flex items-center gap-3">
              {weather.icon && <img src={weather.icon} alt="" className="h-14 w-14" />}
              <div>
                <p className="text-3xl font-semibold">{weather.tempC}°C</p>
                <p className="text-sm text-slate-600">{weather.condition}</p>
              </div>
            </div>
            <p className="mt-4 font-medium">{weather.location}, {weather.region || weather.country}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-slate-500">Humidity</dt><dd className="font-semibold">{weather.humidity}%</dd></div>
              <div><dt className="text-slate-500">UV</dt><dd className="font-semibold">{weather.uv}</dd></div>
              <div><dt className="text-slate-500">Feels like</dt><dd className="font-semibold">{weather.feelsLikeC}°C</dd></div>
              <div><dt className="text-slate-500">Wind</dt><dd className="font-semibold">{weather.windKph} km/h</dd></div>
            </dl>
          </div>

          {tip && (
            <div className="rounded-2xl border border-pink-100 bg-pink-50/40 p-6">
              <p className="text-sm font-semibold text-pink-600">Today&apos;s approach</p>
              <h3 className="mt-2 text-2xl font-semibold">{tip.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{tip.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tip.focus.map((item) => (
                  <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
