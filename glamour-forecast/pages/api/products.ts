import type { NextApiRequest, NextApiResponse } from 'next'
import type { Product } from '../../types'

type DummyProduct = {
  id: number
  title: string
  price: number
  thumbnail: string
  category: string
  brand?: string
  rating?: number
  description: string
  tags?: string[]
}

type DummyResponse = {
  products: DummyProduct[]
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Product[] | { error: string }>
) {
  try {
    const categories = ['beauty', 'skin-care']
    const responses = await Promise.all(
      categories.map(async (category) => {
        const response = await fetch('https://dummyjson.com/products/category/' + category)
        if (!response.ok) throw new Error('Product service failed.')
        return (await response.json()) as DummyResponse
      })
    )

    const products = responses
      .flatMap((response) => response.products)
      .map((product) => ({
        id: String(product.id),
        name: product.title,
        price: product.price,
        image: product.thumbnail,
        category: product.category,
        brand: product.brand || 'Independent',
        rating: product.rating || 0,
        description: product.description,
        tags: product.tags || []
      }))

    return res.status(200).json(products)
  } catch {
    return res.status(502).json({ error: 'Beauty product service is temporarily unavailable.' })
  }
}
