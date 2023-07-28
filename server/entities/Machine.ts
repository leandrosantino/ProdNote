import { z } from 'zod'
import { type Product } from './Product'

export class Machine {
  constructor (
    public slug: string,
    public ute: string,
    public capacity: number,
    public products: Product[],
    public id?: string,
    public productionGroupId?: string
  ) {}
}

export const machineSchema = z.instanceof(Machine)
