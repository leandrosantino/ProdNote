import jwt, { type SignOptions, type VerifyOptions } from 'jsonwebtoken'
import { type IJwtProvider } from '../interfaces/IJwtProvider'

export class JwtProvider implements IJwtProvider {
  secret: string

  constructor () {
    this.secret = 'LEANDROSANTINOF'
  }

  sign (data: object, options: SignOptions) {
    return jwt.sign(data, this.secret, options)
  }

  async verify <T>(token: string, options?: VerifyOptions) {
    return await new Promise<T>((resolve, reject) => {
      jwt.verify(token, this.secret, options, (err, data) => {
        if (err) reject(err)
        resolve(data as T)
      })
    })
  }
}
