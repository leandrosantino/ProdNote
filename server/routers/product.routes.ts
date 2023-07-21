import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { z } from 'zod'
import { productSchema } from '../entities/Product'
import { getProducts } from '../services/getProducts'
import { ProductRepository } from '../repositories/implementations/prisma/ProductRepository'

const t = initTRPC.context<Context>().create()

const protect = t.procedure.use(authenticattionMiddleware)

export const productRoutes = t.router({
  getAll: protect
    .output(z.array(productSchema))
    .query(async () => {
      return await getProducts.execute()
    }),
  getById: protect
    .output(productSchema.nullable())
    .input(z.object({
      id: z.string()
    }))
    .query(async ({ input }) => {
      const productRepository = new ProductRepository()
      return await productRepository.getById(input.id)
    })
})
