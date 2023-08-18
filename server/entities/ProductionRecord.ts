import { type User } from '@prisma/client'
import { type Product } from 'puppeteer'

export interface ProductionRecord {
  id: string
  productId: string
  userId: string
  date: Date | string
  amount: number
  product: Product
  user: User
}
