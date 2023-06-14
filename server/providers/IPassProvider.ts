
export interface IPassProvider {
  algorithm: string
  generate(loginPass: string): string
  verify(loginPass: string, registeredHash: string): boolean
}
