import { describe, expect, it } from 'vitest'
import { filterAndSortProducts } from './catalog'
import type { Product } from '../types'

const products: Product[] = [
  {
    id: '1',
    name: 'Calm Cloud Bath Soak',
    price: 24,
    image: '/one.jpg',
    category: 'bath',
    scent: 'lavender',
    description: 'Mineral bath soak',
    featured: true
  },
  {
    id: '2',
    name: 'Citrus Glow Oil',
    price: 18,
    image: '/two.jpg',
    category: 'body',
    scent: 'citrus',
    description: 'Lightweight body oil'
  }
]

describe('filterAndSortProducts', () => {
  it('filters by category and search term', () => {
    const result = filterAndSortProducts(products, 'lavender', 'bath', 'featured')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('sorts by price ascending', () => {
    const result = filterAndSortProducts(products, '', 'all', 'price-asc')
    expect(result.map((item) => item.id)).toEqual(['2', '1'])
  })
})
