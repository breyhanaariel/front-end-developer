import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import type { AstronomyPayload } from '../types'
import { moonPhaseSymbol } from '../lib/astronomy'

const LazyCharts = dynamic(() => import('./LazyCharts'), {
  ssr: false,
  loading: () => (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]" aria-hidden="true">
      <div className="cosmic-card h-[25rem] animate-pulse" />
      <div className="cosmic-card h-[25rem] animate-pulse" />
    </div>
  )
})

export default function ChartWidget({ data }: { data: AstronomyPayload }) {
  const today = data.days[0]
  const chartBoundaryRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoadCharts, setShouldLoadCharts] = useState(false)

  useEffect(() => {
    const node = chartBoundaryRef.current
    if (!node || shouldLoadCharts) return

    if (!('IntersectionObserver' in window)) {
      setShouldLoadCharts(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadCharts(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldLoadCharts])

  return (
    <section id="dashboard" className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="cosmic-card">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cosmic-500">Moon phase</p>
          <p className="mt-3 text-4xl" aria-hidden="true">{moonPhaseSymbol(today.moonPhase)}</p>
          <p className="mt-2 font-semibold">{today.moonPhase}</p>
        </div>
        <div className="cosmic-card">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cosmic-500">Illumination</p>
          <p className="mt-4 text-3xl font-semibold">{today.moonIllumination}%</p>
          <p className="mt-2 text-sm text-slate-500">Visible lunar disk</p>
        </div>
        <div className="cosmic-card">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cosmic-500">Moon</p>
          <p className="mt-4 font-semibold">Rise {today.moonrise}</p>
          <p className="mt-2 text-sm text-slate-500">Set {today.moonset}</p>
        </div>
        <div className="cosmic-card">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cosmic-500">Sun</p>
          <p className="mt-4 font-semibold">Rise {today.sunrise}</p>
          <p className="mt-2 text-sm text-slate-500">Set {today.sunset}</p>
        </div>
      </div>

      <div ref={chartBoundaryRef}>
        {shouldLoadCharts ? (
          <LazyCharts data={data} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]" aria-label="Interactive charts load when scrolled into view">
            <div className="cosmic-card h-[25rem]">
              <h2 className="text-xl font-semibold">Moon illumination trend</h2>
              <p className="mt-2 text-sm text-slate-500">Interactive chart loads as you scroll.</p>
            </div>
            <div className="cosmic-card h-[25rem]">
              <h2 className="text-xl font-semibold">Tonight at a glance</h2>
              <p className="mt-2 text-sm text-slate-500">Interactive chart loads as you scroll.</p>
            </div>
          </div>
        )}
      </div>

      <div className="cosmic-card overflow-x-auto">
        <h2 className="text-xl font-semibold">Upcoming lunar calendar</h2>
        <table className="mt-5 w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-indigo-100 text-slate-500">
            <tr>
              <th className="pb-3">Date</th>
              <th className="pb-3">Phase</th>
              <th className="pb-3">Illumination</th>
              <th className="pb-3">Moonrise</th>
              <th className="pb-3">Moonset</th>
            </tr>
          </thead>
          <tbody>
            {data.days.map((day) => (
              <tr key={day.date} className="border-b border-indigo-50">
                <td className="py-3">{day.date}</td>
                <td className="py-3">{moonPhaseSymbol(day.moonPhase)} {day.moonPhase}</td>
                <td className="py-3">{day.moonIllumination}%</td>
                <td className="py-3">{day.moonrise}</td>
                <td className="py-3">{day.moonset}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
