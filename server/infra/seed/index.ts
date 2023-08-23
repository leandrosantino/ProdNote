import { logger } from '../../utils/logger'
import { machinesSeed } from './machines.seed'
import { productSeed } from './products.seed.'
import { reasonsLossEfficiencySeed } from './reasonsLossEfficiency.seed'
import { systemPermisionsSeed } from './systemPermissions.seed'
import { usersSeed } from './users.seed'

(async () => {
  await machinesSeed()
  await productSeed()
  await reasonsLossEfficiencySeed()
  await systemPermisionsSeed()
  await usersSeed()
})()
  .catch(logger.error)
