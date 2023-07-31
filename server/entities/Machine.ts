import { type Product } from './Product'

export interface Machine {
  slug: string
  ute: string
  capacity: number
  products?: Product[]
  id?: string
  productionGroupId?: string
}
