import { BackupService } from './BackupService'
import { Repositories } from '../../infra/repositories'
import dotenv from 'dotenv'
import { logger } from '../../utils/logger'
dotenv.config()

const databaseBackupHistoryRepository = new Repositories.DatabaseBackupHistory()

const databaseBackupDir = process.env.DATABASE_BACKUP_DIR as string
const databaseDir = process.env.DATABASE_URL_PRODUCTION as string
const backupFrequencyInDays = process.env.BACKUP_FREQUENCY_IN_DAYS as string

if (!databaseBackupDir) {
  throw new Error('Database bakup directory is not defined!')
}
if (!databaseDir) {
  throw new Error('Database directory is not defined!')
}
if (!backupFrequencyInDays) {
  throw new Error('Database backup frequency is not defined!')
}

export const backupService = new BackupService(
  databaseBackupHistoryRepository,
  databaseBackupDir,
  databaseDir,
  Number(backupFrequencyInDays),
  () => {
    logger.info('backup - ' + new Date().toLocaleString())
  },
  (err) => {
    logger.error('database backup fail - ' + (err).message)
  }
)
