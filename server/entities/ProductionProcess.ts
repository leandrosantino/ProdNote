import { type Machine } from '../entities/Machine'

export interface ProductionProcess {
  id: string
  description: string
  machines?: Machine[]
}
