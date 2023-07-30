export class CreateUserRequestDTO {
  constructor (
    public name: string,
    public email: string,
    public password: string,
    public permissions: number[]
  ) {}
}

export class CreateUserResponseDTO {
  constructor (
    public message: string
  ) {}
}
