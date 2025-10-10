// (Mock weather API — returns deterministic sample)

import type { NextApiRequest, NextApiResponse } from 'next'

type WeatherResponse = {
  location: string
  tempC: number
  condition: string
  tip: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<WeatherResponse>) {
  const { location = 'Orlando' } = req.query
  // simple deterministic logic based on hour
  const hour = new Date().getHours()
  let condition = 'Clear'
  if (hour < 6 || hour > 18) condition = 'Cool Night'
  else if (hour >= 12 && hour <= 15) condition = 'Sunny'

  const tempC = 24 + ((hour % 6) - 3) // sample variation
  const tip =
    condition === 'Sunny'
      ? 'Light SPF foundation + mattifying primer recommended.'
      : condition === 'Cool Night'
      ? 'Hydrating serum and a dewy primer for evening glow.'
      : 'Everyday tinted moisturizer and light blush for balance.'

  res.status(200).json({
    location: String(location),
    tempC,
    condition,
    tip
  })
}
