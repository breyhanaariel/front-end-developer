import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, WeatherData } from '../types'

type GlamourState = {
  location: string
  weather: WeatherData | null
  products: Product[]
  favoriteIds: string[]
  setLocation: (location: string) => void
  setWeather: (weather: WeatherData | null) => void
  setProducts: (products: Product[]) => void
  toggleFavorite: (id: string) => void
}

export const useStore = create<GlamourState>()(
  persist(
    (set) => ({
      location: 'Orlando',
      weather: null,
      products: [],
      favoriteIds: [],
      setLocation: (location) => set({ location }),
      setWeather: (weather) => set({ weather }),
      setProducts: (products) => set({ products }),
      toggleFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
            : [...state.favoriteIds, id]
        }))
    }),
    {
      name: 'glamour-forecast-preferences',
      partialize: (state) => ({
        location: state.location,
        favoriteIds: state.favoriteIds
      })
    }
  )
)
