import { z } from 'zod'

export const productionPlanRequestsDTOSchema = z.object({
  productiveDays: z.number(),
  lowRunner: z.number(),
  highRunner: z.number(),
  machinesId: z.array(z.string()),
  products: z.array(z.object({
    partNumber: z.string(),
    stock: z.number(),
    demand: z.number()
  }))
})

export type ProductionPlanRequestDTO = z.infer<typeof productionPlanRequestsDTOSchema>

export const productionPlanResponseDTOSchema = z.array(z.object({
  machineSlug: z.string(),
  partNumber: z.string(),
  initialStock: z.number(),
  dailyDemand: z.number(),
  finalStock: z.number(),
  minLot: z.number(),
  minProductionTime: z.number()
}))

export type ProductionPlanResponseDTO = z.infer<typeof productionPlanResponseDTOSchema>
