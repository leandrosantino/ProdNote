import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { IAuthUserRequestDTO } from './AuthUserDTO';
import { jwtSigin } from '../../utils/jwtModule'
import { HttpError } from '../../utils/HttpError'

export class AuthUser {

  constructor(
    public usersRepository: IUsersRepository
  ) { }


  async execute(data: IAuthUserRequestDTO) {
    try {

      if (data.password === 'gpt') {

        const user = {
          name: data.userName,
          id: 'teste',
          avatar_url: ''
        }

        const access_token = jwtSigin({
          name: user.name,
          id: user.id,
        }, {
          expiresIn: 60 * 60
        })

        return access_token
      }

      throw new HttpError({ code: 'UNAUTHORIZED', message: 'Invalid Password!' })


    } catch (err) {
      throw new HttpError({ code: 'INTERNAL_SERVER_ERROR' })
    }
  }

}
