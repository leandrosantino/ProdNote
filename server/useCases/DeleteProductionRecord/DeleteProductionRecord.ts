import { type IProductionRecordRepository } from '../../interfaces/IProductionRecordRepository'
import { type IUsersRepository } from '../../interfaces/IUsersRepository'
import { type IPassProvider } from '../../providers/interfaces/IPassProvider'
import { type DeleteProductionRecordRequestDTO } from './DeleteProductionRecordDTO'

export class DeleteProductionRecord {
  constructor (
    private readonly productionRecordRepository: IProductionRecordRepository,
    private readonly userRepository: IUsersRepository,
    private readonly passProvider: IPassProvider
  ) {}

  async execute ({ productionRecordId, userId, password }: DeleteProductionRecordRequestDTO) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('User not Found')
    }

    if (!this.passProvider.verify(password, user.password)) {
      throw new Error('Invalid password')
    }

    await this.productionRecordRepository.delete(productionRecordId)
  }
}
