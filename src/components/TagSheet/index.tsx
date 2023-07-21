import { type Product } from '../../../server/entities/Product'
import { Tag } from './Tag'
import { Container } from './style'

interface TagSheetProps {
  productInfo?: {
    data: Product
    isFractional: boolean
  }
  scale: 'full' | 'reduce'
}

export function TagSheet ({ productInfo, scale }: TagSheetProps) {
  const id = '1234556780'

  if (productInfo === undefined) {
    return
  }

  return (
    <Container>
      <Tag {...{ id, productInfo, scale }}/>
      <Tag {...{ id, productInfo, qrcode: true, scale }}/>
    </Container>
  )
}
