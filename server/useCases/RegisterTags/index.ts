import { Repositories } from '../../infra/repositories'
import { RegisterTags } from './RegisterTags'

export const registerTags = new RegisterTags(
  new Repositories.ProductionRecord()
)
