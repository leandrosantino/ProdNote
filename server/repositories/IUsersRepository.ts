import { User } from "../entities/User";


export interface IUsersRepository {
  findByName(userName: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
  create(data: User): Promise<User>
}

