
export interface IPassProvider {
  generate: (loginPass: string) => string
  verify: (loginPass: string, registeredHash: string) => boolean
}
