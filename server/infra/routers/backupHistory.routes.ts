import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { listBackupHistory } from '../../useCases/ListBackupHistory'

const t = initTRPC.context<Context>().create()

const procedure = t.procedure.use(authenticattionMiddleware('OEE_ADMIN'))

export const BackupHistoryRoutes = t.router({
  getAll: procedure
    .query(async () => {
      return await listBackupHistory.execute()
    })
})
