
export interface IDefaultRepository<T> {
  List(): Promise<T[]>
  Add(data: T): Promise<void>
  GetById(id: string | number): Promise<T>
  Delete(id: string | number): Promise<void>
  Edit(id: string | number, data: T): Promise<T>
}
