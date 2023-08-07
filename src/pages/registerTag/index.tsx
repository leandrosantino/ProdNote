import { Container, MessageContainer } from './styles'
import { useEffect, useState } from 'react'
import { InfoGrid } from './InfoGrid'
import { RecentTable } from './RecentTable'
import { z } from 'zod'
import { parseQrCodeData } from '../../utils/parseQrCodeData'

const codeDataSchema = z.object({
  productId: z.string(),
  tagId: z.string(),
  amount: z.number()
})

type CodeData = z.infer<typeof codeDataSchema>

export function RegisterTag () {
  const [code, setCode] = useState<CodeData>()

  useEffect(() => {
    let temp: string[] = []
    window.addEventListener('keypress', ({ key }) => {
      console.log(key)
      if (key !== 'Enter') { temp.push(key) }
      if (key === 'Enter') {
        const qrCodeData = parseQrCodeData(temp.join())
        try {
          setCode(codeDataSchema
            .parse(JSON.parse(qrCodeData)))
        } catch {}
        temp = []
      }
    })
  }, [])

  useEffect(() => {
    console.log(code)
  }, [code])

  return (
    <Container>
      <h2>Registar Etiqueta</h2>

      <section>
        <MessageContainer>
          teste
        </MessageContainer>
        <InfoGrid info={{
          productId: code?.productId ?? '',
          isFractional: false,
          tagId: code?.tagId ?? ''
        }} />
      </section>

      <h3>Recentes</h3>

      <section>
        <RecentTable/>
      </section>

    </Container>
  )
}
