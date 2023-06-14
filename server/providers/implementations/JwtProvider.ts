import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { IJwtProvider, IJwtUserData } from "../IJwtProvider";

export class JwtProvider implements IJwtProvider {
  secret: string;

  constructor() {
    this.secret = 'LEANDROSANTINOF'
  }

  sigin(data: IJwtUserData, options: SignOptions) {
    return jwt.sign(data, this.secret, options)
  }
  verify(token: string, options?: VerifyOptions) {
    return jwt.verify(token, this.secret, options) as IJwtUserData
  }
}
