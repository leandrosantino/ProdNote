import { ProductionPlan } from './ProductionPlan'
import { Repositories } from '../../repositories/implementations'

const machineRepository = new Repositories.Machine()

export const productionPlan = new ProductionPlan(
  machineRepository
)
