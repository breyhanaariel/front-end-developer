// src/store/useCartStore.ts
// (optional — included for reference; this project triggers cart micro-widget via events for simplicity)

import create from 'zustand'

type CartItem = { id: string; name: string; price: number; qty: number }

type CartState = {
  items: CartItem[]
  add: (item: CartItem) => void
  clear: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  clear: () => set({ items: [] })
}))