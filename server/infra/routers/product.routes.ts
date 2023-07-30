import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { z } from 'zod'
import { ProductRepository } from '../repositories/prisma/ProductRepository'

const t = initTRPC.context<Context>().create()

const procedure = t.procedure.use(authenticattionMiddleware())

const productRepository = new ProductRepository()

export const productRoutes = t.router({
  getAll: procedure
    .query(async () => {
      return await productRepository.findMany()
    }),
  getById: procedure
    .input(z.object({
      id: z.string()
    }))
    .query(async ({ input }) => {
      return await productRepository.findById(input.id)
    })
})
