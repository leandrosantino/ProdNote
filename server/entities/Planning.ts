import { z } from 'zod'
import { planningReportSchema } from './PlanningReport'

export const planningSchema = z.object({
  id: z.string().optional(),
  startsAt: z.date(),
  endsAt: z.date(),
  planningReport: z.array(planningReportSchema)
})

export type Planning = z.infer<typeof planningSchema>
