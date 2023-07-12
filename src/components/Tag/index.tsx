import { type Product } from '../../../server/entities/Product'

interface TagProps {
  products: Product[]
}

export function Tag ({ products }: TagProps) {
  return (
    <div>
      {
        products.map(product => (
          <div key={product.id} >{product.description}</div>
        ))
      }
    </div>
  )
}

export type TagComponent = typeof Tag
