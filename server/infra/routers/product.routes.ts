import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { z } from 'zod'
import { Product } from '../../entities/Product'
import { ProductRepository } from '../repositories/prisma/ProductRepository'

const t = initTRPC.context<Context>().create()

const procedure = t.procedure.use(authenticattionMiddleware())

const productRepository = new ProductRepository()

export const productRoutes = t.router({
  getAll: procedure
    .output(z.array(z.instanceof(Product)))
    .query(async () => {
      return await productRepository.findMany()
    }),
  getById: procedure
    .output(z.instanceof(Product).nullable())
    .input(z.object({
      id: z.string()
    }))
    .query(async ({ input }) => {
      return await productRepository.findById(input.id)
    })
})
