import { z } from 'zod'
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

export const userSchema = z.instanceof(User)
