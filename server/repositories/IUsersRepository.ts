import { User } from "../entities/User";


export interface IUsersRepository {
  findByName(userName: string): Promise<User | null>
  create(data: User): Promise<User>
}

