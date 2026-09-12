import type { NextApiRequest, NextApiResponse } from 'next'
import type { AstronomyPayload } from '../../types'
import { clampIllumination } from '../../lib/astronomy'

type GeocodingResponse = {
  results?: Array<{
    name: string
    admin1?: string
    country?: string
    latitude: number
    longitude: number
    timezone: string
  }>
}

type ForecastResponse = {
  daily: {
    time: string[]
    sunrise: string[]
    sunset: string[]
    moonrise: Array<string | null>
    moonset: Array<string | null>
    moon_phase: number[]
  }
}

function phaseName(value: number): string {
  const phase = ((value % 1) + 1) % 1
  if (phase < 0.03 || phase >= 0.97) return 'New Moon'
  if (phase < 0.22) return 'Waxing Crescent'
  if (phase < 0.28) return 'First Quarter'
  if (phase < 0.47) return 'Waxing Gibbous'
  if (phase < 0.53) return 'Full Moon'
  if (phase < 0.72) return 'Waning Gibbous'
  if (phase < 0.78) return 'Last Quarter'
  return 'Waning Crescent'
}

function illuminationFromPhase(value: number): number {
  const phase = ((value % 1) + 1) % 1
  const fraction = (1 - Math.cos(2 * Math.PI * phase)) / 2
  return clampIllumination(fraction * 100)
}

function timeOnly(value: string | null | undefined): string {
  if (!value) return 'Not available'
  const time = value.split('T')[1]
  return time || value
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AstronomyPayload | { error: string }>
) {
  const location = String(req.query.location || 'Orlando').trim().slice(0, 80)
  const requestedDays = Number(req.query.days)
  const days = requestedDays === 14 ? 14 : 7

  try {
    const geocodeResponse = await fetch(
      'https://geocoding-api.open-meteo.com/v1/search?name=' +
        encodeURIComponent(location) +
        '&count=1&language=en&format=json'
    )

    if (!geocodeResponse.ok) {
      throw new Error('Location service failed.')
    }

    const geocode = (await geocodeResponse.json()) as GeocodingResponse
    const match = geocode.results?.[0]

    if (!match) {
      return res.status(404).json({ error: 'Location not found.' })
    }

    const forecastResponse = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=' +
        match.latitude +
        '&longitude=' +
        match.longitude +
        '&daily=sunrise,sunset,moonrise,moonset,moon_phase' +
        '&timezone=' +
        encodeURIComponent(match.timezone) +
        '&forecast_days=' +
        days
    )

    if (!forecastResponse.ok) {
      throw new Error('Astronomy service failed.')
    }

    const forecast = (await forecastResponse.json()) as ForecastResponse

    return res.status(200).json({
      location: {
        name: match.name,
        region: match.admin1 || '',
        country: match.country || '',
        lat: match.latitude,
        lon: match.longitude,
        tzId: match.timezone
      },
      days: forecast.daily.time.map((date, index) => {
        const phase = forecast.daily.moon_phase[index] ?? 0

        return {
          date,
          sunrise: timeOnly(forecast.daily.sunrise[index]),
          sunset: timeOnly(forecast.daily.sunset[index]),
          moonrise: timeOnly(forecast.daily.moonrise[index]),
          moonset: timeOnly(forecast.daily.moonset[index]),
          moonPhase: phaseName(phase),
          moonIllumination: illuminationFromPhase(phase)
        }
      })
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load astronomy data.'
    return res.status(502).json({ error: message })
  }
}
