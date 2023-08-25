import { type Machine } from '../entities/Machine'

export interface IMachineRepository {
  findById: (id: string) => Promise<Machine | null>
  findMany: () => Promise<Machine[]>
  create: (data: Machine) => Promise<Machine>
  findBySlug: (slug: Machine['slug']) => Promise<Machine | null>
}
