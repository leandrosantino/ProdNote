import { type IMachineRepository } from '../../interfaces/IMachineRepository'
import { ProductionPlan } from './ProductionPlan'
import { type Machine } from '../../entities/Machine'
import { type ProductionPlanResponseDTO } from './ProductionPlanDTO'

describe('tests production plan', () => {
  const machines: Machine[] = [
    { capacity: 27, id: '1', slug: 'M15', ute: 'UTE-3' },
    { capacity: 15, id: '2', slug: 'M16', ute: 'UTE-3' }
  ]

  const machineRepository = {
    async findById (id) {
      const machine = machines.filter(entry => entry.id === id)[0]
      if (machine) { return machine }
      return null
    }
  } as IMachineRepository

  const productionPlan = new ProductionPlan(
    machineRepository
  )

  test('should return production script', async () => {
    const productionScript = productionPlan.execute({
      machinesId: ['1', '2'],
      products: [
        { partNumber: '1', stock: 300, demand: 400 },
        { partNumber: '2', stock: 100, demand: 150 },
        { partNumber: '3', stock: 500, demand: 650 }
      ]
    })

    await expect(productionScript).resolves.toStrictEqual<ProductionPlanResponseDTO>({
      M15: [
        { partNumber: '2', durationInMilliseconds: 6666666.666666667, piorityCoefficient: 0.6666666666666666, quantityToBeProduced: 50 },
        { partNumber: '3', durationInMilliseconds: 20000000, piorityCoefficient: 0.7692307692307693, quantityToBeProduced: 150 }
      ],
      M16: [
        { partNumber: '1', durationInMilliseconds: 24000000, piorityCoefficient: 0.75, quantityToBeProduced: 100 }
      ]
    })
  })

  // test('should return product list with the calculation of quantity' +
  // 'to be produced and piority coefficient', () => {

  // })

  // test('should return product list sorted by quantity to be produced', () => {

  // })

  // test('should return machine info list by machine id list', () => {

  // })

  // test('should sorted array of objects by a specific property', () => {

  // })
})
