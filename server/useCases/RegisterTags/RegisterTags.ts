import { type IProductionRecordRepository } from '../../interfaces/IProductionRecordRepository'
import { type ProductionRecordRequestDTO } from './registerTagsDTO'

export class RegisterTags {
  constructor (
    private readonly productionRecordRepository: IProductionRecordRepository
  ) {}

  async execute (data: ProductionRecordRequestDTO) {
    return await this.productionRecordRepository.create(data)
  }

  async verifyTagId (id: string) {
    const record = await this.productionRecordRepository.findById(id)
    return !!record
  }
}
