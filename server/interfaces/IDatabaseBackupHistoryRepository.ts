import { type DatabaseBackupHistory } from '../entities/DatabaseBackupHistory'

export interface IDatabaseBackupHistoryRepository {
  create: (data: Omit<DatabaseBackupHistory, 'id'>) => Promise<DatabaseBackupHistory>
  findMany: () => Promise<DatabaseBackupHistory[]>
  findLast: () => Promise<DatabaseBackupHistory>
}
