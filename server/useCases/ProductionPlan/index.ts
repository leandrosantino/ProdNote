import { ProductionPlan } from './ProductionPlan'
import { MachineRepository } from '../../repositories/implementations/prisma/MachineRepository'

const machineRepository = new MachineRepository()

export const productionPlan = new ProductionPlan(
  machineRepository
)
