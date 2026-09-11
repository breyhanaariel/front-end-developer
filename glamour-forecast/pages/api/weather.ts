import type { NextApiRequest, NextApiResponse } from 'next'
import type { WeatherData } from '../../types'

type WeatherApiResponse = {
  location: {
    name: string
    region: string
    country: string
  }
  current: {
    temp_c: number
    feelslike_c: number
    humidity: number
    uv: number
    wind_kph: number
    condition: {
      text: string
      icon: string
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData | { error: string }>
) {
  const key = process.env.WEATHERAPI_KEY
  if (!key) {
    return res.status(500).json({ error: 'WEATHERAPI_KEY is not configured.' })
  }

  const location = String(req.query.location || 'Orlando').trim().slice(0, 80)

  try {
    const response = await fetch(
      'https://api.weatherapi.com/v1/current.json?key=' +
        encodeURIComponent(key) +
        '&q=' +
        encodeURIComponent(location) +
        '&aqi=no'
    )

    const body = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: body?.error?.message || 'Unable to load weather data.'
      })
    }

    const data = body as WeatherApiResponse

    return res.status(200).json({
      location: data.location.name,
      region: data.location.region,
      country: data.location.country,
      tempC: data.current.temp_c,
      feelsLikeC: data.current.feelslike_c,
      humidity: data.current.humidity,
      uv: data.current.uv,
      windKph: data.current.wind_kph,
      condition: data.current.condition.text,
      icon: data.current.condition.icon.startsWith('//')
        ? 'https:' + data.current.condition.icon
        : data.current.condition.icon
    })
  } catch {
    return res.status(502).json({ error: 'Weather service is temporarily unavailable.' })
  }
}
