import type { NextApiRequest, NextApiResponse } from 'next'
import type { WeatherData } from '../../types'

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
  current: {
    temperature_2m: number
    apparent_temperature: number
    relative_humidity_2m: number
    wind_speed_10m: number
    weather_code: number
    uv_index?: number
  }
}

const weatherDescriptions: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  56: 'Freezing drizzle',
  57: 'Heavy freezing drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  66: 'Freezing rain',
  67: 'Heavy freezing rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Light rain showers',
  81: 'Rain showers',
  82: 'Heavy rain showers',
  85: 'Snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Severe thunderstorm with hail'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData | { error: string }>
) {
  const location = String(req.query.location || 'Orlando').trim().slice(0, 80)

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
        '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index' +
        '&timezone=' +
        encodeURIComponent(match.timezone) +
        '&forecast_days=1'
    )

    if (!forecastResponse.ok) {
      throw new Error('Weather service failed.')
    }

    const forecast = (await forecastResponse.json()) as ForecastResponse
    const current = forecast.current

    return res.status(200).json({
      location: match.name,
      region: match.admin1 || '',
      country: match.country || '',
      tempC: current.temperature_2m,
      feelsLikeC: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      uv: current.uv_index ?? 0,
      windKph: current.wind_speed_10m,
      condition: weatherDescriptions[current.weather_code] || 'Current conditions',
      icon: ''
    })
  } catch {
    return res.status(502).json({ error: 'Weather service is temporarily unavailable.' })
  }
}
