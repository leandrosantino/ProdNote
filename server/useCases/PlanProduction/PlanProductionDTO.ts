import { z } from 'zod'

export const planProductionRequestsDTOSchema = z.object({
  machinesId: z.array(z.string()),
  products: z.array(z.object({
    partNumber: z.string(),
    stock: z.number(),
    demand: z.number()
  }))
})

export type PlanProductionRequestDTO = z.infer<typeof planProductionRequestsDTOSchema>
