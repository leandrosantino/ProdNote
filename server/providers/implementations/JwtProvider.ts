import jwt, { type SignOptions, type VerifyOptions } from 'jsonwebtoken'
import { type IJwtProvider, type IJwtUserData } from '../IJwtProvider'

export class JwtProvider implements IJwtProvider {
  secret: string

  constructor () {
    this.secret = 'LEANDROSANTINOF'
  }

  sign (data: IJwtUserData, options: SignOptions) {
    return jwt.sign(data, this.secret, options)
  }

  verify (token: string, options?: VerifyOptions) {
    return jwt.verify(token, this.secret, options) as IJwtUserData
  }
}
