import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'

const secret = "LEANDROSANTINO"

export function jwtSigin(data: object, options: SignOptions) {
  return jwt.sign(data, secret, options)
}

export function jwtVerify<T>(token: string, options?: VerifyOptions): T {
  return jwt.verify(token, secret, options) as T
}
