import { ProductionPlan } from './ProductionPlan'
import { Repositories } from '../../infra/repositories'

const machineRepository = new Repositories.Machine()

export const productionPlan = new ProductionPlan(
  machineRepository
)
