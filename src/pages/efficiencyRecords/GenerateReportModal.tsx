import { useState } from 'react'
import { Button } from '../../components/Form/Button'
import { Loading } from '../../components/Loading'
import { type DialogProps } from '../../contexts/dialogContext'
import { GenerateReportModalContainer } from './styles'
import { convertDateStringtoDateObject } from '../../utils/convertDateStringtoDateObject'

interface ModalProps extends DialogProps {}

export function GenerateReportModal ({ finally: end }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [startsDate, setStartsDate] = useState<string>('')
  const [finishDate, setFinishDate] = useState<string>('')

  function handleGenerate () {
    setIsLoading(true)

    console.log({
      startsDate: convertDateStringtoDateObject(startsDate),
      finishDate: convertDateStringtoDateObject(finishDate)
    })

    setTimeout(() => {
      console.log('ere')
      setIsLoading(false)
      end()
    }, 5000)
  }

  return (
    <GenerateReportModalContainer>
      <h1>Selecione um intervalo</h1>
      <div>
        <label >De:</label>
        <input
          type="date"
          value={startsDate}
          onChange={e => { setStartsDate(e.target.value) }}
        />
      </div>
      <div>
        <label >Até:</label>
        <input
          type="date"
          value={finishDate}
          onChange={e => { setFinishDate(e.target.value) }}
        />
      </div>
      <div>
        <Loading show={isLoading} message='Gerando relatório...' />
      </div>
      <Button
        disabled={isLoading}
        onClick={() => { handleGenerate() }}
      >
        Gerar
      </Button>
    </GenerateReportModalContainer>
  )
}
