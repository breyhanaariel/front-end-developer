import { describe, expect, it } from 'vitest'
import { cartItemCount, cartSubtotal, type CartItem } from './useCartStore'

const items: CartItem[] = [
  {
    id: '1',
    name: 'Bath Soak',
    price: 12,
    image: '/bath.jpg',
    category: 'bath',
    scent: 'lavender',
    description: 'Relaxing bath soak',
    quantity: 2
  },
  {
    id: '2',
    name: 'Body Oil',
    price: 18,
    image: '/oil.jpg',
    category: 'body',
    scent: 'citrus',
    description: 'Body oil',
    quantity: 1
  }
]

describe('cart helpers', () => {
  it('counts all cart quantities', () => {
    expect(cartItemCount(items)).toBe(3)
  })

  it('calculates subtotal', () => {
    expect(cartSubtotal(items)).toBe(42)
  })
})
