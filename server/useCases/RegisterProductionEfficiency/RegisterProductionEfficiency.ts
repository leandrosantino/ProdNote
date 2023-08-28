import { type IProductionEfficiencyRecordRepository } from '../../interfaces/IProductionEfficiencyRecordRepository'
import { type IProductionProcessRepository } from '../../interfaces/IProductionProcessRepository'
import { type RegisterProductionEfficiencyRequestDTO } from './RegisterProductionEfficiencyDTO'

export class RegisterProductionEfficiency {
  constructor (
    private readonly productionEfficiencyRecordRepository: IProductionEfficiencyRecordRepository,
    private readonly productionProcessRepository: IProductionProcessRepository
  ) {}

  async execute ({ data, productionEfficiencyLosses }: RegisterProductionEfficiencyRequestDTO) {
    const productionProcess = await this.productionProcessRepository
      .findById(data.productionProcessId)

    if (!productionProcess) throw new Error('production process not found')

    const oeeValue = this.calculateOEE({
      piecesQuantity: data.piecesQuantity,
      productionTimeInMinutes: data.productionTimeInMinutes,
      cycleTimeInSeconds: productionProcess.cycleTimeInSeconds
    })
    console.log(oeeValue)

    const register = await this.productionEfficiencyRecordRepository
      .create({ ...data, oeeValue }, productionEfficiencyLosses)

    return register
  }

  calculateOEE ({ cycleTimeInSeconds, piecesQuantity, productionTimeInMinutes }: {
    piecesQuantity: number
    cycleTimeInSeconds: number
    productionTimeInMinutes: number
  }) {
    const cycleTimeInMinutes = cycleTimeInSeconds / 60
    return (piecesQuantity * cycleTimeInMinutes) / productionTimeInMinutes
  }
}
