// React chart component (Chart.js) that reads Redux data.

import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchCelestial } from "../store/celestialSlice";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ChartWidget() {
  const dispatch = useAppDispatch();
  const points = useAppSelector((s) => s.celestial.points);
  const status = useAppSelector((s) => s.celestial.status);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCelestial());
  }, [dispatch, status]);

  const labels = points ? points.map(p => new Date(p.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})) : [];
  const brightnessData = points ? points.map(p => p.brightness) : [];

  const data = {
    labels,
    datasets: [
      {
        label: "Brightness",
        data: brightnessData,
        tension: 0.3,
        borderColor: "#6f7cff",
        backgroundColor: "rgba(111,124,255,0.12)",
        fill: true
      }
    ]
  };

  return (
    <section id="dashboard" className="max-w-6xl mx-auto my-8 px-4">
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Celestial Brightness (last 24h)</h2>
        {status === "loading" && <p className="text-sm text-slate-500">Loading data…</p>}
        {status === "failed" && <p className="text-sm text-red-500">Failed to load data.</p>}
        {points && (
          <div style={{height: 320}}>
            <Line data={data} />
          </div>
        )}
      </div>
    </section>
  );
}