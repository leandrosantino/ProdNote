import { type Machine } from './Machine'

export interface Product {

  description: string
  technicalDescription: string
  ute: string
  classification: string
  partNumber: string
  sapCode: string
  projectNumber: string
  amount: number
  machines?: Machine[]
  id?: string
  productionGroupId?: string

}
