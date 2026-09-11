export type Product = {
  id: string
  name: string
  price: number
  image: string
  category: string
  scent: string
  description: string
  featured?: boolean
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name'

export type CheckoutFields = {
  name: string
  email: string
  address: string
  city: string
  postalCode: string
}
