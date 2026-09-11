import type { Product, SortOption } from '../types'

export function filterAndSortProducts(
  products: Product[],
  query: string,
  category: string,
  sort: SortOption
): Product[] {
  const normalizedQuery = query.trim().toLowerCase()

  const filtered = products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category
    const matchesQuery =
      normalizedQuery.length === 0 ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.scent.toLowerCase().includes(normalizedQuery)

    return matchesCategory && matchesQuery
  })

  return [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'name') return a.name.localeCompare(b.name)
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  })
}
