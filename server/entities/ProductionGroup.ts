import { z } from 'zod'
import { productSchema } from './Product'
import { machineSchema } from './Machine'

export const productionGroupSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  products: z.array(productSchema),
  machines: z.array(machineSchema)
})

export type ProductionGroup = z.infer<typeof productionGroupSchema>
