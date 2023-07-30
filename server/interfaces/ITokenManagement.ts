import { type SystemPermissionKeys } from '../entities/SystemPermission'

export interface TokenData {
  name: string
  id: string
  permissions: SystemPermissionKeys[]
}

export interface ITokenManagement {
  verify: (token: string, requiredPermission?: SystemPermissionKeys) => Promise<TokenData | undefined>
  generate: (data: TokenData) => Promise<string>
}
