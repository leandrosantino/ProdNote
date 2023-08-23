import { type Machine } from '../../../entities/Machine'
import { type IMachineRepository } from '../../../interfaces/IMachineRepository'
import { prisma } from './connection'

export class MachineRepository implements IMachineRepository {
  async findById (id: string) {
    const machine = await prisma.machine.findUnique({
      where: { id }
    })
    return machine as Machine | null
  }

  async findMany () {
    return await prisma.machine.findMany() as Machine[]
  }

  async create (data: Omit<Machine, 'products'>) {
    const machine = await prisma.machine.create({ data })
    return machine as Machine
  }
}
