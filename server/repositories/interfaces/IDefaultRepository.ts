
export interface IDefaultRepository<T> {
  findAll(): Promise<T[]>
  create(data: T): Promise<T>
  findById(id: string | number): Promise<T>
  delete(id: string | number): Promise<void>
  update(id: string | number, data: T): Promise<T>
}
