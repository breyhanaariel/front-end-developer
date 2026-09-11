export type AstronomyDay = {
  date: string
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moonPhase: string
  moonIllumination: number
}

export type AstronomyPayload = {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tzId: string
  }
  days: AstronomyDay[]
}
