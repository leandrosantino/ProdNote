import { type IMachineRepository } from '../../repositories/interfaces/IMachineRepository'
import { type PlanProductionRequestDTO } from './PlanProductionDTO'

interface ProcessedMachine {
  capacity: number
  slug: string
  currentActionDurationInhours: number
}

interface ProcessedProducts {
  partNumber: string
  quantityToBeProduced: number
  piorityCoefficient: number
}

export class PlanProduction {
  constructor (
    private readonly machineRepository: IMachineRepository
  ) {}

  async execute ({ machinesId, products }: PlanProductionRequestDTO) {
    const porcessedMachines: ProcessedMachine[] = await this
      .getMachineInfo(machinesId)

    const machinesOrderBycapacity = this.orderArrayOfObjects<ProcessedMachine>(
      porcessedMachines,
      'capacity',
      'desc'
    )

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

    const groupedProductsList = this.groupArrayOfObjects<ProcessedProducts>(
      productsSortedByPriorityCoefficient,
      machinesOrderBycapacity.length
    )
    const productionScript: Array<{
      partNumber: string
      machineSlug: string
      action: string
      durationInMilliseconds: number
      piorityCoefficient: number
      quantityToBeProduced: number
    }> = []

    let machinesOrderByActionDuration = machinesOrderBycapacity

    groupedProductsList.forEach((group) => {
      group.forEach(({ partNumber, quantityToBeProduced, piorityCoefficient }, index) => {
        const machine = machinesOrderByActionDuration[index]
        const durationInMilliseconds = (quantityToBeProduced / machine.capacity)
        machine.currentActionDurationInhours = durationInMilliseconds

        productionScript.push({
          partNumber,
          action: 'Produzir',
          machineSlug: machine.slug,
          durationInMilliseconds,
          piorityCoefficient,
          quantityToBeProduced
        })
      })
      machinesOrderByActionDuration = this
        .orderArrayOfObjects(
          machinesOrderByActionDuration,
          'currentActionDurationInhours',
          'asc'
        )
    })

    console.log(productionScript)

    return 's'
  }

  private async getMachineInfo (machinesId: PlanProductionRequestDTO['machinesId']) {
    const machines: ProcessedMachine[] = []

    for await (const id of machinesId) {
      const machine = await this.machineRepository.getById(id)
      if (machine) {
        machines.push({
          capacity: machine.capacity,
          slug: machine.slug,
          currentActionDurationInhours: 0
        })
      }
    }

    return machines
  }

  private groupArrayOfObjects <T>(objects: T[], quantityPerGroup: number) {
    const groupedArray: T[][] = []
    for (let index = 0; index <= objects.length - 1; index += quantityPerGroup) {
      const group: T[] = []
      for (let i = 0; i < quantityPerGroup; i++) {
        const object = objects[index + i]
        if (object) {
          group.push(object)
        }
      }
      groupedArray.push(group)
    }
    return groupedArray
  }

  private orderArrayOfObjects <T>(
    objects: T[],
    referenceKey: keyof typeof objects[number],
    order: 'asc' | 'desc'
  ) {
    return objects
      .sort((previousObject, currentObject) => {
        if (previousObject[referenceKey] < currentObject[referenceKey]) {
          return order === 'asc' ? -1 : 1
        }
        if (previousObject[referenceKey] > currentObject[referenceKey]) {
          return order === 'asc' ? 1 : -1
        }
        return 0
      })
  }
}
