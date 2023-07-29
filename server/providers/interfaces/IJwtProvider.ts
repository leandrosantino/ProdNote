export interface IJwtProvider {
  secret: string
  sign: (data: object, options: object) => string
  verify: <T>(token: string, options?: object) => Promise<T | undefined>
}
