import { type Machine } from '../../entities/Machine'

export interface IMachineRepository {
  getById: (id: string) => Promise<Machine | null>
  findMany: () => Promise<Machine[]>
}
