import { z } from 'zod'
import { type Product } from './Product'
import { type Machine } from './Machine'
import { type Planning } from './Planning'
import { type PlanningReport } from './PlanningReport'

export class ProductionGroup {
  constructor (
    public name: string,
    public products: Product[],
    public machines: Machine[],
    public plannings: Planning[],
    public planningReport: PlanningReport[],
    public id?: string
  ) {}
}

export const productionGroupSchema = z.instanceof(ProductionGroup)
