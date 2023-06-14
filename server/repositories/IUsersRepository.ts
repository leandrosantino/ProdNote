import { User } from "../entities/User";
import { IDefaultRepository } from "./IDefaultRepository";


export interface IUsersRepository extends IDefaultRepository<User> {
  findByUserName(userName: string): Promise<User | null>
}

