import { Container, MessageContainer } from './styles'
import { useEffect, useState } from 'react'
import { InfoGrid } from './InfoGrid'
import { RecentTable } from './RecentTable'
import { z } from 'zod'
import { parseQrCodeData } from '../../utils/parseQrCodeData'
import { useLocalState } from '../../hooks/useLocalState'
import { useAuth } from '../../hooks/useAuth'
import { trpc } from '../../utils/api'
import { type Product } from '../../../server/entities/Product'

const codeDataSchema = z.object({
  productId: z.string(),
  tagId: z.string(),
  isFractional: z.boolean()
})

type QrCodeData = z.infer<typeof codeDataSchema>

export interface Recents {
  description: string
  isFractional: boolean
  tagId: string
  date: Date
}

export function RegisterTag () {
  const { user } = useAuth()
  const [qrCodeData, setQrCodeData] = useState<QrCodeData>()
  const [recents, setRecents] = useLocalState<Recents[]>(user?.name as string)
  const { data: product } = trpc.product.getById.useQuery({ id: qrCodeData?.productId ?? '' })

  useEffect(() => {
    let temp: string[] = []
    window.addEventListener('keypress', ({ key }) => {
      if (key !== 'Enter') { temp.push(key) }
      if (key === 'Enter') {
        const qrCodeDataString = parseQrCodeData(temp.join())
        try {
          setQrCodeData(codeDataSchema.parse(JSON.parse(qrCodeDataString)))
        } catch {}
        temp = []
      }
    })
  }, [])

  useEffect(() => {
    console.log(qrCodeData)
  }, [qrCodeData])

  function handleRegister () {
    if (product && qrCodeData) {
      setRecents(oldState => oldState
        ? [...oldState, {
            date: new Date(),
            description: product.description,
            isFractional: qrCodeData.isFractional,
            tagId: qrCodeData.tagId
          }]
        : [])
    }
    console.log()
  }

  return (
    <Container>
      <h2>Registar Etiqueta</h2>

      <section>
        <MessageContainer>
          teste
        </MessageContainer>
        <InfoGrid
          onRegister={handleRegister}
          info={{
            product: product as Product,
            isFractional: false,
            tagId: qrCodeData?.tagId ?? ''
          }}
        />
      </section>

      <h3>Recentes</h3>

      <section>
        <RecentTable data={recents} />
      </section>

    </Container>
  )
}
