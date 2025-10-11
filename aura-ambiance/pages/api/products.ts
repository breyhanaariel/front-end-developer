// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import products from '../../public/mock-products.json'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(products)
}