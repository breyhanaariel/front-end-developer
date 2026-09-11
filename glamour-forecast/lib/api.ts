import type { Product, WeatherData } from '../types'

export async function fetchWeather(location: string): Promise<WeatherData> {
  const response = await fetch('/api/weather?location=' + encodeURIComponent(location))
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Failed to fetch weather.')
  return data as WeatherData
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products')
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Failed to fetch products.')
  return data as Product[]
}
