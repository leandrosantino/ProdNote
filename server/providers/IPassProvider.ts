
export interface IPassProvider {
  algorithm: string
  generatePass(loginPass: string): string
  verifyPass(loginPass: string, registeredHash: string): boolean
}
