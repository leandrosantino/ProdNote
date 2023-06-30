import fs from 'fs'
import { createElement } from 'react'
import { ReactSSR } from '../providers/implementations/ReactSSR'
import { PDFCreator } from '../providers/implementations/PDFCreator'

interface TagProps { data: { a: string } }

function Teste ({ data }: TagProps) {
  return createElement('div', { data })
}

const reactSSR = new ReactSSR()
const pdfCreator = new PDFCreator()

const app = reactSSR.renderToString<TagProps>({
  data: { a: 'fsfefef' }
}, Teste)

pdfCreator.createFromHtml(app)
  .then(pdf => {
    console.log(app)
    fs.writeFileSync('C:/Users/leand/Área de Trabalho/teste.pdf', pdf, { encoding: 'utf-8' })
  })
  .catch((err) => { console.log(err) })
