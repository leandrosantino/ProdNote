import { type Machine } from '../../../entities/Machine'
import { type IMachineRepository } from '../../interfaces/IMachineRepository'

const machines: Machine[] = [
  {
    capacity: 27,
    id: '1',
    slug: 'M15',
    ute: 'UTE-3'
  },
  {
    capacity: 15,
    id: '2',
    slug: 'M16',
    ute: 'UTE-3'
  }
]

export class MachineRepository implements IMachineRepository {
  async findById (id: string) {
    const machine = machines.filter(machine => machine.id === id)[0]
    if (machine) {
      return machine
    }
    return null
  }

  async findMany () {
    return machines
  }
}
