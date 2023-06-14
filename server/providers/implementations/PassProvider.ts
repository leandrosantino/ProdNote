import { IPassProvider } from "../IPassProvider";
import crypto from 'crypto'

export class PassProvider implements IPassProvider {

  algorithm = 'sha512';

  generatePass(loginPass: string): string {
    const hash = crypto.createHmac(this.algorithm, loginPass)
    return hash.digest('hex')
  }

  verifyPass(loginPass: string, registeredHash: string): boolean {
    const loginHash = crypto.createHmac(this.algorithm, loginPass)
    return loginHash.digest('hex') == registeredHash
  }


}
