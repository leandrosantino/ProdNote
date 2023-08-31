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

    let lostTimeInMinutes = 0

    productionEfficiencyLosses.forEach(entry => { lostTimeInMinutes += entry.lostTimeInMinutes })

    const coerency = this.verifyCoerency({
      piecesQuantity: data.piecesQuantity,
      productionTimeInMinutes: data.productionTimeInMinutes,
      cycleTimeInSeconds: productionProcess.cycleTimeInSeconds,
      lostTimeInMinutes
    })

    if (coerency !== 'ok') {
      throw new Error(`time ${coerency}`)
    }

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

  verifyCoerency (props: {
    piecesQuantity: number
    cycleTimeInSeconds: number
    productionTimeInMinutes: number
    lostTimeInMinutes: number
  }) {
    const CUTOFF = 0.01
    const piecesQuantityInMinutes = (props.piecesQuantity * props.cycleTimeInSeconds) / 60
    const productionTimePointer = piecesQuantityInMinutes + props.lostTimeInMinutes
    const diff = props.productionTimeInMinutes - productionTimePointer
    const diffInPercent = diff / props.productionTimeInMinutes
    console.log(diffInPercent)

    if (Math.abs(diffInPercent) > CUTOFF) {
      if (diffInPercent >= 0) {
        return 'missing'
      }
      if (diffInPercent < 0) {
        return 'exdent'
      }
    }

    return 'ok'
  }
}
