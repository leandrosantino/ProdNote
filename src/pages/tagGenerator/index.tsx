import { Container } from './styles'
import * as Form from '@radix-ui/react-form'
import { Combobox } from '../../components/Form/Combobox'

const options = [
  { name: 'Carpet frontal headline 592/551', value: '1' },
  { name: 'Teto moldado 226', value: '2' },
  { name: 'Bloco hood 551', value: '3' }
]

export function TagGenerator () {
  return (
    <Container>

      <div>
        <Form.Root onSubmit={(e) => { e.preventDefault() }} >
          <Combobox
            name='Produto'
            onSelect={(option) => { console.log(option) }}
            options={options}
            placeholder='Insira o nome do produto que deseja procurar'
            invalid={false}
          />

        </Form.Root>

        vlsdçfiuvdçorilgkn
      </div>

      <section>

      </section>

    </Container>
  )
}
