import { type User } from '@prisma/client'
import { type Product } from 'puppeteer'

export interface ProductionRecord {
  id: string
  product_id: string
  user_id: string
  date: Date | string
  amount: number
  product: Product
  user: User
}
