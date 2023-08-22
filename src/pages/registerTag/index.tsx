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
import { useDialog } from '../../hooks/useDialog'

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
  amount: number
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
  const dialog = useDialog()

  const { user } = useAuth()
  const [qrCodeData, setQrCodeData] = useState<QrCodeData>()
  const [recents, setRecents] = useLocalState<Recents[]>(user?.id as string)
  const [tagState, setTagState] = useState<TagStateKeys>()

  const { data: product } = trpc.product.getById.useQuery({ id: qrCodeData?.productId ?? '' })
  const regiserTag = trpc.tag.registerTag.useMutation({})

  useEffect(() => {
    let temp: string[] = []
    window.addEventListener('keypress', ({ key }) => {
      if (key !== 'Enter') { temp.push(key) }
      if (key === 'Enter' && temp.length > 0) {
        try {
          const qrCodeDataString = parseQrCodeData(temp.join(''))
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

  function register (amount: number) {
    if (product && qrCodeData && tagState === 'valid') {
      regiserTag.mutateAsync({
        amount,
        id: qrCodeData.tagId,
        productId: `${(product.id as string)}`,
        userId: user?.id as string
      })
        .then(() => {
          setTagState('success_save')
          setRecents(oldState => {
            const currentState = oldState
              ? [{
                  date: new Date(),
                  description: product.description,
                  isFractional: qrCodeData.isFractional,
                  tagId: qrCodeData.tagId,
                  amount
                }, ...oldState]
              : []
            if (currentState.length > 50) {
              currentState.pop()
            }

            return currentState
          })
        })
        .catch(() => {
          setTagState('invalid')
        })
    }
  }

  function handleRegister () {
    if (tagState === 'already_register') {
      setTagState('invalid')
      return
    }

    if (tagState === 'success_save') {
      setTagState('already_register')
      return
    }

    if (product && qrCodeData && tagState === 'valid') {
      if (qrCodeData.isFractional) {
        dialog.prompt({
          title: 'Etiqueta fracionada!',
          message: 'informe a quantidade para continuar',
          type: 'number',
          refuse () {},
          accept (value: number) {
            if (Number(value) < 1) {
              dialog.alert({
                title: 'Erro!',
                message: 'A quantidade não pode ser menor que 1',
                error: true
              })
              return
            }
            register(Number(value))
          }
        })
        return
      }
      register(product.amount)
    }
  }

  function handleDeleteRecents (id: string) {
    dialog.question({
      title: 'Atenção!!',
      message: 'Realmente deseja apgar este registro?',
      accept () {
        dialog.prompt({
          title: 'Excluir registro!',
          message: 'Insira sua senha para continuar',
          type: 'password',
          refuse () {},
          accept (value) {
            fetch.tag.delete.mutate({
              password: value,
              productionRecordId: id,
              userId: user?.id as string
            })
              .then(() => {
                setRecents(old => old ? old?.filter(entry => entry.tagId !== id) : old)
                dialog.alert({
                  title: 'Concluído!',
                  message: 'A etiqueta foi excluida do sistema'
                })
              })
              .catch((err: Error) => {
                dialog.alert({
                  title: 'Erro!',
                  message: `Falha ao excluir etiqueta. msg: ${err.message}`,
                  error: true
                })
              })
          }
        })
      },
      refuse: () => {}
    })
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
