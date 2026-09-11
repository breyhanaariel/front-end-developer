import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../types'

export type CartItem = Product & { quantity: number }

type CartState = {
  items: CartItem[]
  add: (product: Product) => void
  remove: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              )
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.id !== id)
              : state.items.map((item) =>
                  item.id === id ? { ...item, quantity } : item
                )
        })),
      clear: () => set({ items: [] })
    }),
    {
      name: 'aura-ambiance-cart',
      version: 1
    }
  )
)

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0)
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}
