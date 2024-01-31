import { type DatabaseBackupHistory } from '../../../entities/DatabaseBackupHistory'
import { type IDatabaseBackupHistoryRepository } from '../../../interfaces/IDatabaseBackupHistoryRepository'
import { prisma } from './connection'

export class DatabaseBackupHistoryRepository implements IDatabaseBackupHistoryRepository {
  async create (data: Omit<DatabaseBackupHistory, 'id'>) {
    const history = await prisma.databaseBackupHistory.create({
      data
    })
    return history as DatabaseBackupHistory
  }

  async findMany () {
    const history = await prisma.databaseBackupHistory.findMany()
    return history as DatabaseBackupHistory[]
  }

  async findLast () {
    const history = await prisma.databaseBackupHistory.findFirst({
      orderBy: {
        id: 'desc'
      }
    })
    return history as DatabaseBackupHistory
  }
}
