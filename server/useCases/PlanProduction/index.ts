import { PlanProduction } from './PlanProduction'
import { MachineRepository } from '../../repositories/implementations/prisma/MachineRepository'

const machineRepository = new MachineRepository()

export const planProduction = new PlanProduction(
  machineRepository
)
