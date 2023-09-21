import { type IProductionProcessRepository } from '../../interfaces/IProductionProcessRepository'
import { type IUsersRepository } from '../../interfaces/IUsersRepository'
import { type IPassProvider } from '../../providers/interfaces/IPassProvider'
import { type DeleteProductionProcessRequestDTO } from './DeleteProductionProcessDTO'

export class DeleteProductionProcess {
  constructor (
    private readonly productionProcessRepository: IProductionProcessRepository,
    private readonly userRepository: IUsersRepository,
    private readonly passProvider: IPassProvider
  ) {}

  async execute ({ userId, password, productionProcessId }: DeleteProductionProcessRequestDTO) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('User not Found')
    }

    if (!this.passProvider.verify(password, user.password)) {
      throw new Error('Invalid password')
    }

    await this.productionProcessRepository.delete(productionProcessId)
  }
}
