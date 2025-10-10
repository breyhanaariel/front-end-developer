import create from 'zustand'

type WeatherState = {
  location: string
  weather?: {
    location: string
    tempC: number
    condition: string
    tip: string
  } | null
  products: any[] | null
  setLocation: (loc: string) => void
  setWeather: (w: any) => void
  setProducts: (p: any[]) => void
}

export const useStore = create<WeatherState>((set) => ({
  location: 'Orlando',
  weather: null,
  products: null,
  setLocation: (loc) => set({ location: loc }),
  setWeather: (w) => set({ weather: w }),
  setProducts: (p) => set({ products: p })
}))
