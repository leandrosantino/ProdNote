import { type SystemPermission } from './SystemPermission'

export class User {
  constructor (
    public name: string,
    public password: string,
    public email: string,
    public permissions: SystemPermission[],
    public id?: string
  ) {}
}
