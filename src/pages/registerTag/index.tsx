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

import { ShieldAlert, ShieldCheck, ShieldClose, SaveAll, type LucideIcon } from 'lucide-react'

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

const tagStatekeys = [
  'valid',
  'already_register',
  'invalid',
  'success_save'
] as const

export type TagStateKeys = typeof tagStatekeys[number]

const TagStateIcon: Record<TagStateKeys, { Icon: LucideIcon, msg: string }> = {
  already_register: { Icon: ShieldAlert, msg: 'A etiqueta já foi registrada enteriormente!' },
  invalid: { Icon: ShieldClose, msg: 'Etiqueta inválida!!' },
  success_save: { Icon: SaveAll, msg: 'Registrado com sucesso!!!!' },
  valid: { Icon: ShieldCheck, msg: 'Etiqueta válida, Click em registar' }
}

export function RegisterTag () {
  const { user } = useAuth()
  const [qrCodeData, setQrCodeData] = useState<QrCodeData>()
  const [recents, setRecents] = useLocalState<Recents[]>(user?.name as string)
  const { data: product } = trpc.product.getById.useQuery({ id: qrCodeData?.productId ?? '' })

  const [tagState] = useState<TagStateKeys>()

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

  function handleDeleteRecents (id: string) {
    setRecents(old => old ? old?.filter(entry => entry.tagId !== id) : old)
  }

  return (
    <Container>
      <h2>Registar Etiqueta</h2>

      <section>
        <MessageContainer state={tagState} >
          {tagState && (() => {
            const { Icon, msg } = TagStateIcon[tagState]
            return (<>
              <Icon size={80}/>
              <span dangerouslySetInnerHTML={{ __html: msg }} ></span>
            </>)
          })()}

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
        <RecentTable data={recents} handleDelete={handleDeleteRecents} />
      </section>

    </Container>
  )
}
