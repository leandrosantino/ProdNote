import { type IDatabaseBackupHistoryRepository } from '../../interfaces/IDatabaseBackupHistoryRepository'

export class ListBackupHistory {
  constructor (
    private readonly databaseBackupHistoryRepository: IDatabaseBackupHistoryRepository
  ) {}

  async execute () {
    return await this.databaseBackupHistoryRepository.findMany()
  }
}
