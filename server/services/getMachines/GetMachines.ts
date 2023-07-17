import { type IMachineRepository } from '../../repositories/interfaces/IMachineRepository'
import { HttpError } from '../../utils/HttpError'
export class GetMachines {
  constructor (
    private readonly machinesRepository: IMachineRepository
  ) {}

  async execute () {
    try {
      return await this.machinesRepository.findMany()
    } catch (error) {
      throw new HttpError({ code: 'INTERNAL_SERVER_ERROR' })
    }
  }
}
