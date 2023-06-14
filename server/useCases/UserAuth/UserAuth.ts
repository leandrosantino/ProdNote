import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUserAuthRequestDTO } from './UserAuthDTO';
import { HttpError } from '../../utils/HttpError'
import { IJwtProvider } from '../../providers/IJwtProvider';
import { IPassProvider } from '../../providers/IPassProvider';

export class UserAuth {

  constructor(
    public usersRepository: IUsersRepository,
    public jwt: IJwtProvider,
    public pass: IPassProvider
  ) { }


  async execute(data: IUserAuthRequestDTO) {


    const user = await this.usersRepository.findByUserName(data.userName)

    if (!user) {
      throw new HttpError({ code: 'UNAUTHORIZED', message: 'Unregistered User' })
    }

    if (this.pass.verifyPass(data.password, user.password)) {
      const access_token = this.jwt.sigin({
        name: user.name,
        id: user.id
      }, {
        expiresIn: 60 * 60
      })

      return access_token
    }

    throw new HttpError({ code: 'UNAUTHORIZED', message: 'Invalid Password!' })


  }

}
