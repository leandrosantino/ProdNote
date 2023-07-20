import { type Product } from '../../../server/entities/Product'

interface TagProps {
  productInfo?: {
    data: Product
    isFractional: boolean
  }
}

export function Tag ({ productInfo }: TagProps) {
  if (productInfo === undefined) {
    return
  }

  return (
    <span>
      {productInfo.data.description} -
      {productInfo.isFractional ? 'sim' : 'não'}
    </span>
  )
}
