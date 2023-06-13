import { User } from "../../models/User";
import { IDefaultRepository } from "./IDefaultRepository";

export interface IUserRepository extends IDefaultRepository<User> {
  teste(a: User): void
}

