import type { NextApiRequest, NextApiResponse } from 'next'
import type { AstronomyPayload } from '../../types'
import { clampIllumination } from '../../lib/astronomy'

type WeatherApiResponse = {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
  }
  astronomy: {
    astro: {
      sunrise: string
      sunset: string
      moonrise: string
      moonset: string
      moon_phase: string
      moon_illumination: number | string
    }
  }
}

function dateString(offset: number): string {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() + offset)
  return date.toISOString().slice(0, 10)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AstronomyPayload | { error: string }>
) {
  const key = process.env.WEATHERAPI_KEY
  if (!key) {
    return res.status(500).json({ error: 'WEATHERAPI_KEY is not configured.' })
  }

  const location = String(req.query.location || 'Orlando').trim().slice(0, 80)
  const requestedDays = Number(req.query.days)
  const days = requestedDays === 14 ? 14 : 7

  try {
    const responses = await Promise.all(
      Array.from({ length: days }, async (_, index) => {
        const date = dateString(index)
        const url =
          'https://api.weatherapi.com/v1/astronomy.json?key=' +
          encodeURIComponent(key) +
          '&q=' +
          encodeURIComponent(location) +
          '&dt=' +
          date

        const response = await fetch(url)
        if (!response.ok) {
          const body = await response.json().catch(() => null)
          const message = body?.error?.message || 'WeatherAPI request failed.'
          throw new Error(message)
        }

        const body = (await response.json()) as WeatherApiResponse
        return { date, body }
      })
    )

    const first = responses[0].body.location

    return res.status(200).json({
      location: {
        name: first.name,
        region: first.region,
        country: first.country,
        lat: first.lat,
        lon: first.lon,
        tzId: first.tz_id
      },
      days: responses.map(({ date, body }) => ({
        date,
        sunrise: body.astronomy.astro.sunrise,
        sunset: body.astronomy.astro.sunset,
        moonrise: body.astronomy.astro.moonrise,
        moonset: body.astronomy.astro.moonset,
        moonPhase: body.astronomy.astro.moon_phase,
        moonIllumination: clampIllumination(Number(body.astronomy.astro.moon_illumination))
      }))
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load astronomy data.'
    return res.status(502).json({ error: message })
  }
}
