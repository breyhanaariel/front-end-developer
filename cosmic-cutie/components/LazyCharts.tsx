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

export default function LazyCharts({ data }: { data: AstronomyPayload }) {
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
              animation: false,
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
              animation: false,
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
  )
}
