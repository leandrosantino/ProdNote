import { z } from 'zod'

export const productionPlanRequestsDTOSchema = z.object({
  machinesId: z.array(z.string()),
  products: z.array(z.object({
    partNumber: z.string(),
    stock: z.number(),
    demand: z.number()
  }))
})

export type ProductionPlanRequestDTO = z.infer<typeof productionPlanRequestsDTOSchema>
