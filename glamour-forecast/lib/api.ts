//(Mock wrappers hitting Next API routes — swap out for real third-party endpoints later)

export type WeatherData = {
  location: string
  tempC: number
  condition: string
}

export type Product = {
  id: string
  name: string
  price: number
  image?: string
  tags?: string[]
  description?: string
}

export async function fetchWeather(location = 'orlando'): Promise<WeatherData> {
  const res = await fetch(`/api/weather?location=${encodeURIComponent(location)}`)
  if (!res.ok) throw new Error('Failed to fetch weather')
  return res.json()
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`/api/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}
