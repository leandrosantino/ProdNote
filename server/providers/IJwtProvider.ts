
export interface IJwtUserData {
  name: string
  id: string
}

export interface IJwtProvider {
  secret: string
  sigin(data: IJwtUserData, options: object): string
  verify(token: string, options?: object): IJwtUserData
}
