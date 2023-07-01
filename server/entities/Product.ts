import { z } from 'zod'

export const productSchema = z.object({
  id: z.string().optional(),
  description: z.string(),
  technicalDescription: z.string(),
  ute: z.string(),
  classification: z.string(),
  partNumber: z.string(),
  sapCode: z.string(),
  projectNumber: z.string(),
  amount: z.number()
})

export type Product = z.infer<typeof productSchema>
