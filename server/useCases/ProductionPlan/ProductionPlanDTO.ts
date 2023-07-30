export class ProductionPlanRequestDTO {
  constructor (
    public productiveDays: number,
    public lowRunner: number,
    public highRunner: number,
    public machinesId: string[],
    public products: Array<{
      partNumber: string
      stock: number
      demand: number
    }>
  ) {}
}
export class ClassProductionPlanResponseDTO {
  constructor (
    public machineSlug: string,
    public partNumber: string,
    public initialStock: number,
    public dailyDemand: number,
    public finalStock: number,
    public minLot: number,
    public minProductionTime: number
  ) {}
}

export type ProductionPlanResponseDTO = ClassProductionPlanResponseDTO[]
