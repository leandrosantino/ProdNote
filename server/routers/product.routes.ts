import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { z } from 'zod'
import { productSchema } from '../entities/Product'
import { ProductRepository } from '../repositories/implementations/prisma/ProductRepository'

const t = initTRPC.context<Context>().create()

const protect = t.procedure.use(authenticattionMiddleware)

const productRepository = new ProductRepository()

export const productRoutes = t.router({
  getAll: protect
    .output(z.array(productSchema))
    .query(async () => {
      return await productRepository.findMany()
    }),
  getById: protect
    .output(productSchema.nullable())
    .input(z.object({
      id: z.string()
    }))
    .query(async ({ input }) => {
      return await productRepository.findById(input.id)
    })
})
