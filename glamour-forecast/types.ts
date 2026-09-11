export type WeatherData = {
  location: string
  region: string
  country: string
  tempC: number
  feelsLikeC: number
  humidity: number
  uv: number
  windKph: number
  condition: string
  icon: string
}

export type Product = {
  id: string
  name: string
  price: number
  image: string
  category: string
  brand: string
  rating: number
  description: string
  tags: string[]
}

export type BeautyTip = {
  title: string
  summary: string
  focus: string[]
}
