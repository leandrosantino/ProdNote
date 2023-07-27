import { ProductionPlan } from './ProductionPlan'
import { MachineRepository } from '../../repositories/implementations/prisma/MachineRepository'

const machineRepository = new MachineRepository()

export const productionPlan = new ProductionPlan(
  machineRepository
);

(async () => {
  console.log(await productionPlan.execute({
    productiveDays: 6,
    lowRunner: 6,
    highRunner: 3,
    machinesId: ['1', '2'],
    products: [
      { partNumber: 'Bloco', stock: 100, demand: 500 },
      { partNumber: 'Carpete', stock: 260, demand: 600 },
      { partNumber: 'Hood', stock: 200, demand: 450 },
      { partNumber: 'Teto', stock: 300, demand: 500 }
    ]
  }))
})()
  .catch(console.log)
