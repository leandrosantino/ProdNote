import { type IMachineRepository } from '../../repositories/interfaces/IMachineRepository'
import { type ProductionPlanRequestDTO, type ProductionPlanResponseDTO } from './ProductionPlanDTO'

export interface ProcessedMachine {
  capacity: number
  slug: string
  totalDurationOfActions: number
}

export interface ProcessedProducts {
  partNumber: string
  quantityToBeProduced: number
  piorityCoefficient: number
  dailyDemand: number
  initialStock: number
}

export class ProductionPlan {
  constructor (
    private readonly machineRepository: IMachineRepository
  ) {}

  async execute ({ machinesId, products, productiveDays, highRunner, lowRunner }: ProductionPlanRequestDTO) {
    const listOfProcessedProducts: ProcessedProducts[] = this
      .processProduct(
        products,
        productiveDays,
        lowRunner,
        highRunner
      )

    const productsSortedByPriorityCoefficient = this
      .orderArrayOfObjects(
        listOfProcessedProducts,
        'piorityCoefficient',
        'asc'
      )

    const productsSortedByQuantityToBeProduced = this
      .sortProductsByQuantityToBeProduced(
        productsSortedByPriorityCoefficient
      )

    const porcessedMachines: ProcessedMachine[] = await this
      .getMachineInfo(machinesId)

    const productionScript: ProductionPlanResponseDTO = this
      .createProductionScript(
        productsSortedByQuantityToBeProduced,
        porcessedMachines
      )

    return productionScript
  }

  private createProductionScript (products: ProcessedProducts[], machines: ProcessedMachine[]) {
    const productionScript: ProductionPlanResponseDTO = []
    let machinesOrderByCapacityAndActionsDuration = machines

    products
      .forEach(({ partNumber, quantityToBeProduced, piorityCoefficient, dailyDemand, initialStock }) => {
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
        const durationInMilliseconds = (quantityToBeProduced / machine.capacity) * 60 * 60 * 1000
        machine.totalDurationOfActions += durationInMilliseconds

        productionScript.push({
          machineSlug: machine.slug,
          partNumber,
          initialStock,
          dailyDemand,
          finalStock: piorityCoefficient,
          minLot: quantityToBeProduced,
          minProductionTime: durationInMilliseconds
        })
      })

    return productionScript
  }

  sortProductsByQuantityToBeProduced (products: ProcessedProducts[]) {
    return products
      .sort((laterObject, currentObject) => {
        const differenceBetweenPriorityCoefficient =
          laterObject.piorityCoefficient - currentObject.piorityCoefficient
        const differenceBetweenQuantityToBeProduced =
          laterObject.quantityToBeProduced - currentObject.quantityToBeProduced
        if (
          differenceBetweenPriorityCoefficient <= 0.5 &&
        differenceBetweenQuantityToBeProduced >= 100
        ) {
          return -1
        }
        if (
          differenceBetweenPriorityCoefficient > 0.5 &&
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
      const machine = await this.machineRepository.findById(id)
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

  private processProduct (
    products: ProductionPlanRequestDTO['products'],
    productiveDays: ProductionPlanRequestDTO['productiveDays'],
    lowRunner: ProductionPlanRequestDTO['lowRunner'],
    highRunner: ProductionPlanRequestDTO['highRunner']
  ): ProcessedProducts[] {
    return products.map(product => {
      const dailyDemand = product.demand / productiveDays
      const coverage = (product.stock - dailyDemand) / dailyDemand
      const minLot = dailyDemand * (dailyDemand <= 30 ? lowRunner : highRunner)
      return {
        partNumber: product.partNumber,
        quantityToBeProduced: minLot,
        piorityCoefficient: coverage,
        dailyDemand,
        initialStock: product.stock / dailyDemand
      }
    })
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
