import { type IMachineRepository } from '../../repositories/interfaces/IMachineRepository'
import { type ProductionPlanRequestDTO } from './ProductionPlanDTO'

interface ProcessedMachine {
  capacity: number
  slug: string
  totalDurationOfActions: number
}

interface ProcessedProducts {
  partNumber: string
  quantityToBeProduced: number
  piorityCoefficient: number
}

export class ProductionPlan {
  constructor (
    private readonly machineRepository: IMachineRepository
  ) {}

  async execute ({ machinesId, products }: ProductionPlanRequestDTO) {
    const listOfProcessedProducts: ProcessedProducts[] = products.map(product => ({
      partNumber: product.partNumber,
      quantityToBeProduced: product.demand - product.stock,
      piorityCoefficient: product.stock / product.demand
    }))

    const productsSortedByPriorityCoefficient = this.orderArrayOfObjects<ProcessedProducts>(
      listOfProcessedProducts,
      'piorityCoefficient',
      'asc'
    )

    const productsSortedByQuantityToBeProduced = this
      .sortProductsByQuantityToBeProduced(
        productsSortedByPriorityCoefficient
      )

    const productionScript: Record<string, Array<{
      partNumber: string
      durationInMilliseconds: number
      piorityCoefficient: number
      quantityToBeProduced: number
    }>> = {}

    const porcessedMachines: ProcessedMachine[] = await this
      .getMachineInfo(machinesId)

    let machinesOrderByCapacityAndActionsDuration = porcessedMachines

    productsSortedByQuantityToBeProduced
      .forEach(({ partNumber, quantityToBeProduced, piorityCoefficient }) => {
        machinesOrderByCapacityAndActionsDuration = this
          .orderArrayOfObjects(
            (this.orderArrayOfObjects(
              machinesOrderByCapacityAndActionsDuration,
              'capacity',
              'desc'
            )),
            'totalDurationOfActions',
            'asc'
          )

        const machine = machinesOrderByCapacityAndActionsDuration[0]
        const durationInMilliseconds = (quantityToBeProduced / machine.capacity)
        machine.totalDurationOfActions += durationInMilliseconds

        const scriptData = {
          partNumber,
          durationInMilliseconds,
          piorityCoefficient,
          quantityToBeProduced
        }

        productionScript[machine.slug]
          ? productionScript[machine.slug].push(scriptData)
          : productionScript[machine.slug] = [scriptData]
      })

    console.log(productionScript)

    return 's'
  }

  private sortProductsByQuantityToBeProduced (products: ProcessedProducts[]) {
    return products
      .sort((laterObject, currentObject) => {
        const differenceBetweenPriorityCoefficient =
          laterObject.piorityCoefficient - currentObject.piorityCoefficient
        const differenceBetweenQuantityToBeProduced =
          laterObject.quantityToBeProduced - currentObject.quantityToBeProduced
        if (
          differenceBetweenPriorityCoefficient <= 10 &&
        differenceBetweenQuantityToBeProduced >= 100
        ) {
          return -1
        }
        if (
          differenceBetweenPriorityCoefficient > 10 &&
        differenceBetweenQuantityToBeProduced < 100
        ) {
          return 1
        }
        return 0
      })
  }

  private async getMachineInfo (machinesId: ProductionPlanRequestDTO['machinesId']) {
    const machines: ProcessedMachine[] = []

    for await (const id of machinesId) {
      const machine = await this.machineRepository.getById(id)
      if (machine) {
        machines.push({
          capacity: machine.capacity,
          slug: machine.slug,
          totalDurationOfActions: 0
        })
      }
    }

    return machines
  }

  private orderArrayOfObjects <T>(
    objects: T[],
    referenceKey: keyof typeof objects[number],
    order: 'asc' | 'desc'
  ) {
    return objects
      .sort((previousObject, currentObject) => {
        if (previousObject[referenceKey] > currentObject[referenceKey]) {
          return order === 'asc' ? 1 : -1
        }
        if (previousObject[referenceKey] < currentObject[referenceKey]) {
          return order === 'asc' ? -1 : 1
        }
        return 0
      })
  }
}
