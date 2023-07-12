import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { z } from 'zod'
import { productSchema } from '../entities/Product'
import { ProductRepository } from '../repositories/implementations/prisma/ProductRepository'

const t = initTRPC.context<Context>().create()

const protect = t.procedure.use(authenticattionMiddleware)

export const productRoutes = t.router({
  getAll: protect
    .output(z.array(productSchema))
    .query(async () => {
      const productRepository = new ProductRepository()
      return await productRepository.findMany()
    })
})
