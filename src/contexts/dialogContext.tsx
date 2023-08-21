import { type ReactNode, createContext, useState } from 'react'
import { Dialog } from '../components/dialog'
import { Prompt } from '../components/dialog/prompt'

export interface DialogProps {
  title: string
  message: string
  isQuestion?: boolean
  accept?: (value?: any) => void
  refuse?: () => void
  finally: () => void
  error?: boolean
  type?: 'text' | 'password' | 'number'
}

interface AlertProps { title: string, message: string, error?: boolean }

interface QuestionProps extends AlertProps {
  accept: () => void
  refuse: () => void
}

interface PromptProps extends AlertProps {
  type: DialogProps['type']
  accept?: (value?: any) => void
  refuse: () => void
}

interface DialogContextProps {
  alert: (props: AlertProps) => void
  question: (props: QuestionProps) => void
  prompt: (props: PromptProps) => void

}

export const DialogContext = createContext({} as DialogContextProps)
const { Provider } = DialogContext

export function DialogProvider ({ children }: { children: ReactNode }) {
  const [isPrompt, setIsPrompt] = useState(false)
  const [show, setShow] = useState(false)
  const [dialogPorps, setDialogProps] = useState<DialogProps>({} as DialogProps)

  function alert ({ message, title, error }: AlertProps) {
    setShow(true)
    setIsPrompt(false)
    setDialogProps({
      error,
      title,
      message,
      finally: () => { setShow(false) }
    })
  }

  function question ({ message, title, accept, refuse }: QuestionProps) {
    setShow(true)
    setIsPrompt(false)
    setDialogProps({
      isQuestion: true,
      title,
      message,
      accept,
      refuse,
      finally: () => { setShow(false) }
    })
  }

  function prompt ({ message, refuse, title, type, accept }: PromptProps) {
    setShow(true)
    setIsPrompt(true)
    setDialogProps({
      isQuestion: true,
      title,
      message,
      accept,
      refuse,
      type,
      finally: () => { setShow(false) }
    })
  }

  return (
    <Provider
      value={{
        alert, question, prompt
      }}
    >
      {show && <>{
        isPrompt
          ? <Prompt {...dialogPorps} />
          : <Dialog {...dialogPorps} />
      }</>}
      {children}
    </Provider>
  )
}
