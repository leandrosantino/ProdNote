import { type SystemPermission } from './SystemPermission'

export interface User {
  name: string
  password: string
  email: string
  permissions: SystemPermission[]
  id?: string
}
