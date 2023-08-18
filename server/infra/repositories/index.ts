import { MachineRepository } from './prisma/MachineRepository'
import { ProductRepository } from './prisma/ProductRepository'
import { SystemPermissionRepository } from './prisma/SystemPermissionsRepository'
import { UsersRepository } from './prisma/UsersRepository'
import { ProductionRecordRepository } from './prisma/ProductionRecordRepository'

export const Repositories = {
  Machine: MachineRepository,
  Product: ProductRepository,
  SystemPermission: SystemPermissionRepository,
  Users: UsersRepository,
  ProductionRecord: ProductionRecordRepository
}
