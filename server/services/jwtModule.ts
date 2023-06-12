import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'

const secret = "LEANDROSANTINO"

export function jwtSigin(data: object, options: SignOptions) {
  return jwt.sign(data, secret, options)
}

export function jwtVerify(token: string, options?: VerifyOptions) {
  return jwt.verify(token, secret, options)
}
