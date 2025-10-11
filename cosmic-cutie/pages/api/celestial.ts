// pages/api/celestial.ts
// Mock API serving sample "celestial data" that the dashboard consumes.

import type { NextApiRequest, NextApiResponse } from 'next'

type CelestialPoint = {
  timestamp: number
  moonPhase: number // 0-1
  brightness: number // 0-100
}

export default function handler(req: NextApiRequest, res: NextApiResponse<CelestialPoint[]>) {
  // generate deterministic-ish recent data points
  const now = Date.now()
  const points: CelestialPoint[] = []
  for (let i = 0; i < 24; i++) {
    const t = now - (23 - i) * 60 * 60 * 1000
    points.push({
      timestamp: t,
      moonPhase: Math.abs(Math.sin((i / 24) * Math.PI * 2)),
      brightness: Math.round(40 + 40 * Math.abs(Math.cos((i / 24) * Math.PI * 2)) + Math.random() * 10)
    })
  }
  res.status(200).json(points)
}