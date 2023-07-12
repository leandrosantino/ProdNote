import { z } from 'zod'

export const createTagsRequestDTOSchema = z.array(z.object({
  id: z.string(),
  isFractional: z.boolean(),
  amount: z.number()
}))

export type CreateTagsRequestDTO = z.infer<typeof createTagsRequestDTOSchema>
