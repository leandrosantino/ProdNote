import { type Machine } from './Machine'

export class Product {
  constructor (
    public description: string,
    public technicalDescription: string,
    public ute: string,
    public classification: string,
    public partNumber: string,
    public sapCode: string,
    public projectNumber: string,
    public amount: number,
    public machines?: Machine[],
    public id?: string,
    public productionGroupId?: string
  ) {}
}
