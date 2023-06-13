import { User } from "../../../entities/User"
import { IUsersRepository, UserRepositoryFindFilterProps } from "../../interfaces/IUsersRepository"

export class UsersRepository implements IUsersRepository {

  async findFilter({ name }: UserRepositoryFindFilterProps) {
    console.log(name)
    return {} as User
  }
  async findAll() {
    return [] as User[]
  }

  async create(data: User) {
    console.log(data)
    return {} as User
  }

  async delete(id: string) {
    console.log(id)
  }

  async update(id: string, data: User) {
    console.log(id, data)
    return {} as User
  }

  async findById(id: string) {
    console.log(id)
    return {} as User
  }

}
