import { type SystemPermissionKeys } from '../../entities/SystemPermission'
import { type IJwtProvider } from '../../providers/interfaces/IJwtProvider'
import { type TokenData, type ITokenManagement } from '../../interfaces/ITokenManagement'

export class TokenManagement implements ITokenManagement {
  constructor (
    private readonly jwt: IJwtProvider
  ) {}

  private readonly expiresIn = '1 days'

  async generate (data: TokenData) {
    return this.jwt.sign(data, {
      expiresIn: this.expiresIn
    })
  }

  async verify (token: string | undefined, requiredPermission?: SystemPermissionKeys) {
    if (token) {
      const user = await this.jwt.verify<TokenData>(token)

      if (!user) {
        throw new Error('invalid access_token')
      }

      if (requiredPermission) {
        if (!user.permissions.find(permission => permission === requiredPermission)) {
          throw new Error("The access_token don't have the required permissions for this request")
        }
      }

      return user
    }
    throw new Error('access_token not found')
  }
}
