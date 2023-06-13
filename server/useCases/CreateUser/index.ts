import { UsersRepository } from "../../repositories/implementations/prisma/UsersRepository";
import { CreateUser } from "./CreateUser";

const usersRepository = new UsersRepository()

export const createUser = new CreateUser(
  usersRepository
)

