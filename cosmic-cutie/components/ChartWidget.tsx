import {
  ArcElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'
import type { AstronomyPayload } from '../types'
import { moonPhaseSymbol } from '../lib/astronomy'

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function ChartWidget({ data }: { data: AstronomyPayload }) {
  const today = data.days[0]
  const labels = data.days.map((day) =>
    new Date(day.date + 'T12:00:00').toLocaleDateString([], { month: 'short', day: 'numeric' })
  )

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Moon illumination %',
        data: data.days.map((day) => day.moonIllumination),
        borderColor: '#6f7cff',
        backgroundColor: 'rgba(111, 124, 255, 0.15)',
        pointBackgroundColor: '#ff7fbf',
        tension: 0.35,
        fill: true
      }
    ]
  }

  const illuminationData = {
    labels: ['Illuminated', 'Dark'],
    datasets: [
      {
        data: [today.moonIllumination, 100 - today.moonIllumination],
        backgroundColor: ['#6f7cff', '#edf0ff'],
        borderWidth: 0
      }
    ]
  }

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

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="cosmic-card">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Moon illumination trend</h2>
            <p className="mt-1 text-sm text-slate-500">Daily illumination from Open-Meteo astronomy data.</p>
          </div>
          <div className="h-80">
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { min: 0, max: 100 } }
              }}
            />
          </div>
        </div>

        <div className="cosmic-card">
          <h2 className="text-xl font-semibold">Tonight at a glance</h2>
          <div className="mx-auto mt-5 h-52 w-52">
            <Doughnut
              data={illuminationData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: { legend: { position: 'bottom' } }
              }}
            />
          </div>
          <p className="mt-5 text-center text-sm text-slate-500">
            {data.location.name}, {data.location.region || data.location.country}
          </p>
        </div>
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
