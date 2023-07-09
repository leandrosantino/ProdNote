import { Container } from './styles'
import { Combobox } from '../../components/Form/Combobox'
import { Field } from '../../components/Form/Field'
import { Button } from '../../components/Form/Botton'
import { PlusCircledIcon } from '@radix-ui/react-icons'

const options = [
  { name: 'Carpet frontal headline 592/551', value: '1' },
  { name: 'Teto moldado 226', value: '2' },
  { name: 'Bloco hood 551', value: '3' },
  { name: 'Bloco hood 5512', value: '3' },
  { name: 'Bloco hood 5513', value: '3' },
  { name: 'Bloco hood 5514', value: '3' },
  { name: 'Bloco hood 5515', value: '3' },
  { name: 'Bloco hood 5516', value: '3' },
  { name: 'Bloco hood 5517', value: '3' },
  { name: 'Bloco hood 5518', value: '3' }
]

export function TagGenerator () {
  return (
    <Container>

      <section className='a'>
        <form onSubmit={(e) => { e.preventDefault() }} >
          <Combobox
            name='Produto'
            onSelectOption={(option) => { console.log(option) }}
            options={options}
            placeholder='Insira o nome do produto que deseja procurar'
            isValid={false}
            message='erro'
          />

          <Field.Root message='teste' isValid={false} className='amountField'>
            <Field.Label>Quant.</Field.Label>
            <Field.Control>
              <input type="number" />
            </Field.Control>
          </Field.Root>

          <Button>
            adicionar
            <PlusCircledIcon/>
          </Button>

        </form>
          vlsdçfiuvdçorilgkn
      </section>

      <section>

      </section>

    </Container>
  )
}
