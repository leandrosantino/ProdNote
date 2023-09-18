import { Container, FieldCase } from './styles'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Field } from '../../components/Form/Field'

const processFormSchema = z.object({
  description: z.string()
})

type ProcessForm = z.infer<typeof processFormSchema>

export function EditProductionProcess () {
  const processForm = useForm<ProcessForm>({
    resolver: zodResolver(processFormSchema)
  })

  const {
    handleSubmit
  } = processForm

  function handleSave (data: ProcessForm) {
    console.log(data)
  }

  return (
    <Container>
      <div>
        <h1>Processos de Produção</h1>

        <FormProvider {...processForm} >
          <form onSubmit={handleSubmit(handleSave)} >

              <Field.Root>
                <Field.Label>Descrição</Field.Label>
                <Field.Input type='text' name='description'/>
                <Field.ErrorMessage field='description' />
              </Field.Root>

              <FieldCase>
                <Field.Root>
                  <Field.Label>UTE:</Field.Label>
                  <Field.Input type='text' name='description'/>
                  <Field.ErrorMessage field='description' />
                </Field.Root>

                <Field.Root>
                  <Field.Label>UTE:</Field.Label>
                  <Field.Input type='text' name='description'/>
                  <Field.ErrorMessage field='description' />
                </Field.Root>
              </FieldCase>

          </form>
        </FormProvider>

      </div>
      <div></div>
    </Container>
  )
}
