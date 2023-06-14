
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { HttpError } from '../../utils/HttpError'
export class CreateUser {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ name }: ICreateUserRequestDTO) {
    try {
      return await this.usersRepository.create({ name })
    } catch {
      throw new HttpError({ code: 'INTERNAL_SERVER_ERROR' })
    }
  }

}
