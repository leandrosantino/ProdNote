import { Repositories } from '../../infra/repositories'
import { ListBackupHistory } from './ListBackupHistory'

export const listBackupHistory = new ListBackupHistory(
  new Repositories.DatabaseBackupHistory()
)
