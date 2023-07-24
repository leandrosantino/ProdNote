import { type IIdProvider } from '../interfaces/IIdProvider'
import { createId } from '@paralleldrive/cuid2'

export class IdProvider implements IIdProvider {
  generateCUID () {
    return createId()
  }
}
