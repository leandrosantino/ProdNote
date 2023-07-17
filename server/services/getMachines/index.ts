
import { GetMachines } from './GetMachines'
import { MachineRepository } from '../../repositories/implementations/prisma/MachineRepository'

export const getMachines = new GetMachines(
  new MachineRepository()
)
