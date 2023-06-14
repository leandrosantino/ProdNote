import { User } from "../entities/User";


export interface IUsersRepository {
  findByUserName(userName: string): Promise<User | null>
  create(data: User): Promise<User>
}

