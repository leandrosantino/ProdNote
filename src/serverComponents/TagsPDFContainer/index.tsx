import { ThemeModeProvider } from '../../contexts/themeContext'
import { GlobalStyle } from '../../styles/global'
import { Container, Sheet } from './styles'
import { type ITagsPDFContainerComponentProps } from '../../../server/interfaces/ITagsPDFContainerComponent'
import { Tag } from '../../components/TagSheet/Tag'

export function TagsPDFContainer ({ tags }: ITagsPDFContainerComponentProps) {
  return (
    <ThemeModeProvider>
      <GlobalStyle />
      <Container>
        {
          tags.map(({ data, isFractional, tagId }) => (
            <Sheet key={tagId} >
              <Tag
                id={tagId}
                productInfo={{ data, isFractional }}
                scale='full'
              />
              <Tag
                id={tagId}
                productInfo={{ data, isFractional }}
                scale='full'
                qrcode
              />
            </Sheet>
          ))
        }
      </Container>
    </ThemeModeProvider>
  )
}
