import { Container, MessageContainer } from './styles'
import { useEffect, useState } from 'react'
import { InfoGrid } from './InfoGrid'
import { RecentTable } from './RecentTable'
import { z } from 'zod'
import { parseQrCodeData } from '../../utils/parseQrCodeData'
import { useLocalState } from '../../hooks/useLocalState'
import { useAuth } from '../../hooks/useAuth'
import { trpc, fetch } from '../../utils/api'
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
  invalid: { Icon: ShieldClose, msg: 'Falha ao registrar, alguma informação está incorreta!' },
  success_save: { Icon: SaveAll, msg: 'Registrado com sucesso!!!!' },
  valid: { Icon: ShieldCheck, msg: 'Etiqueta válida, Click em registar' }
}

export function RegisterTag () {
  const { user } = useAuth()
  const [qrCodeData, setQrCodeData] = useState<QrCodeData>()
  const [recents, setRecents] = useLocalState<Recents[]>(user?.id as string)
  const { data: product } = trpc.product.getById.useQuery({ id: qrCodeData?.productId ?? '' })

  const regiserTag = trpc.tag.registerTag.useMutation({})

  const [tagState, setTagState] = useState<TagStateKeys>()

  useEffect(() => {
    let temp: string[] = []
    window.addEventListener('keypress', ({ key }) => {
      if (key !== 'Enter') { temp.push(key) }
      if (key === 'Enter') {
        const qrCodeDataString = parseQrCodeData(temp.join())
        try {
          onReadQrCode(qrCodeDataString)
        } catch {}
        temp = []
      }
    })
  }, [])

  function onReadQrCode (code: string) {
    try {
      const qrcodedata = codeDataSchema.parse(JSON.parse(code))
      setQrCodeData(qrcodedata)
      fetch.tag.verifyTagId.query(qrcodedata.tagId)
        .then((data) => {
          if (data) {
            setTagState('valid')
            return
          }
          setTagState('already_register')
        })
        .catch(console.log)
    } catch {
      setTagState('invalid')
    }
  }

  function handleRegister () {
    if (product && qrCodeData) {
      regiserTag.mutateAsync({
        amount: product.amount,
        id: qrCodeData.tagId,
        productId: `${(product.id as string)}`,
        userId: user?.id as string
      })
        .then(() => {
          setTagState('success_save')

          setRecents(oldState => oldState
            ? [...oldState, {
                date: new Date(),
                description: product.description,
                isFractional: qrCodeData.isFractional,
                tagId: qrCodeData.tagId
              }]
            : [])
        })
        .catch(() => {
          setTagState('invalid')
        })
    }
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
