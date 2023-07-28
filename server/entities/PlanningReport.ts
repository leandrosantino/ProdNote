import { z } from 'zod'

export const planningReportSchema = z.object({
  id: z.string().optional(),
  index: z.number(),
  productionGroupId: z.string(),
  planningId: z.string()
})

export type PlanningReport = z.infer<typeof planningReportSchema>
