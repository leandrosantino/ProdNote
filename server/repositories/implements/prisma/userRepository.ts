import { User } from "../../../models/User"
import { IUserRepository } from "../../interfaces/IUserRepository"

export class UserRepository implements IUserRepository {
  teste(a: User) {
    console.log(a)
  }
  async List() {
    return [] as User[]
  }

  async Add(data: User) {
    console.log(data)
  }

  async Delete(id: string) {
    console.log(id)
  }

  async Edit(id: string, data: User) {
    console.log(id, data)
    return {} as User
  }

  async GetById(id: string) {
    console.log(id)
    return {} as User
  }

}
