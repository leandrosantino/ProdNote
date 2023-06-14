import { User } from "../../../entities/User"
import { IUsersRepository } from "../../IUsersRepository"

export class UsersRepository implements IUsersRepository {

  async create(data: User) {
    console.log(data)
    return {} as User
  }

  async findByUserName(userName: string) {
    const user = {
      id: 'leandrosanoihr',
      name: 'PROD@adler',
      password: '7c60aad5a35c5c40b52223ecc4fe7db6d8506a526515378fcbd27fa0ff6253b9f32fb7b3f6cf41c1e2de6d78a9ffdc09648906ece4b97798522b8bebf4eec826'
    } as User

    if (user.name == userName) {
      return user
    }

    return null
  }

}
