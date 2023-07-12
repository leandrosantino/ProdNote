import { type Product } from '../entities/Product'

export interface ITagsProps {
  data: Product
  isFractional: boolean
}

export interface ITagsPDFContainerComponentProps {
  tags: ITagsProps[]
}

export type ITagsPDFContainerComponent = (props: ITagsPDFContainerComponentProps) => JSX.Element
