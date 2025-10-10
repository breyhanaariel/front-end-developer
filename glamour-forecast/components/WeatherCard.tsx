import React, { useEffect, useState } from 'react'
import { fetchWeather } from '../lib/api'
import { useStore } from '../store/useStore'
import AnimatedBadge from './AnimatedBadge'

export default function WeatherCard() {
  const location = useStore((s) => s.location)
  const weather = useStore((s) => s.weather)
  const setWeather = useStore((s) => s.setWeather)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const w = await fetchWeather(location)
        if (mounted) setWeather(w)
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [location, setWeather])

  return (
    <section id="weather" className="max-w-5xl mx-auto my-8 px-4">
      <div className="card flex flex-col md:flex-row items-start gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Current Forecast — {weather?.location ?? location}</h2>
          {loading ? (
            <p className="text-sm text-slate-500">Loading…</p>
          ) : weather ? (
            <>
              <p className="text-4xl font-bold mt-3">{weather.tempC}°C</p>
              <p className="mt-1 text-sm text-slate-600">Condition: {weather.condition}</p>
              <div className="mt-4">
                <AnimatedBadge text="Weather-Based Recommendation" />
                <p className="mt-2 text-sm text-slate-700">{weather.tip}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-500">No weather data.</p>
          )}
        </div>

        <div className="w-full md:w-64">
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 h-full">
            <p className="text-sm text-slate-600">Quick Tip</p>
            <p className="mt-2 font-medium">Match your base to humidity and temperature for best wear.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
