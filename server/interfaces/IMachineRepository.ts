import { type Machine } from '../entities/Machine'

export interface IMachineRepository {
  findById: (id: string) => Promise<Machine | null>
  findMany: () => Promise<Machine[]>
}
