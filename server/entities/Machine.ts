import { z } from 'zod'

export const machineSchema = z.object({
  id: z.string(),
  slug: z.string(),
  ute: z.string(),
  capacity: z.number()
})

export type Machine = z.infer<typeof machineSchema>
