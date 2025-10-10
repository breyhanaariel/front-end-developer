import type { NextApiRequest, NextApiResponse } from 'next'

type Product = {
  id: string
  name: string
  price: number
  image?: string
  tags?: string[]
  description?: string
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Glow Dew Serum',
    price: 28,
    image: '/favicon.ico',
    tags: ['hydrating', 'serum'],
    description: 'A lightweight serum for instant dewy finish.'
  },
  {
    id: 'p2',
    name: 'Matte Miracle Primer',
    price: 22,
    image: '/favicon.ico',
    tags: ['primer', 'mattifying'],
    description: 'Smooths pores and extends makeup wear.'
  },
  {
    id: 'p3',
    name: 'Velvet Blush Compact',
    price: 18,
    image: '/favicon.ico',
    tags: ['blush', 'compact'],
    description: 'Soft, blendable blush for natural flush.'
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Product[]>) {
  res.status(200).json(PRODUCTS)
}
