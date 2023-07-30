import { Authentication } from './Authentication'
import { PassProvider } from '../../providers/implementations/PassProvider'
import { Repositories } from '../../infra/repositories'
import { tokenManagement } from '../../services/TokenManagement'

const userRepository = new Repositories.Users()
const pass = new PassProvider()

export const authentication = new Authentication(
  userRepository,
  tokenManagement,
  pass
)
