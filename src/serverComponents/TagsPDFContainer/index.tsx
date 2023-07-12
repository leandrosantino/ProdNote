import { ThemeModeProvider } from '../../contexts/themeContext'
import { GlobalStyle } from '../../styles/global'
import { Container } from './styles'
import { type ITagsPDFContainerComponentProps } from '../../../server/interfaces/ITagsPDFContainerComponent'

export function TagsPDFContainer ({ tags }: ITagsPDFContainerComponentProps) {
  return (
    <ThemeModeProvider>
      <GlobalStyle />
      <Container>
        {
          tags.map(({ data }) => (
            <div key={data.id} >{data.description}</div>
          ))
        }
      </Container>
    </ThemeModeProvider>
  )
}
