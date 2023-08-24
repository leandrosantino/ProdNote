import { type IProductionEfficiencyRecordRepository } from '../../interfaces/IProductionEfficiencyRecordRepository'
import { type RegisterProductionEfficiencyRequestDTO } from './RegisterProductionEfficiencyDTO'

export class RegisterProductionEfficiency {
  constructor (
    private readonly productionEfficiencyRecordRepository: IProductionEfficiencyRecordRepository
  ) {}

  async execute ({ data, productionEfficiencyLosses }: RegisterProductionEfficiencyRequestDTO) {
    const oeeValue = 10

    const register = await this.productionEfficiencyRecordRepository
      .create({ ...data, oeeValue }, productionEfficiencyLosses)

    console.log(register)
  }

  async calculateOEE () {

  }
}
