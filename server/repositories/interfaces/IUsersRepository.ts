import { User } from "../../models/User";
import { IDefaultRepository } from "./IDefaultRepository";

export interface UserRepositoryFindFilterProps {
  name: string
}

export interface IUsersRepository extends IDefaultRepository<User> {
  findFilter(filters: UserRepositoryFindFilterProps): Promise<User>
}

