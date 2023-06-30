import { createElement } from 'react'
import { ReactSSR } from '../providers/implementations/ReactSSR'

interface TagProps { data: { a: string } }

function Teste ({ data }: TagProps) {
  return createElement('div', { data })
}

const reactSSR = new ReactSSR()

const app = reactSSR.renderToString<TagProps>({
  data: { a: 'fsfefef' }
}, Teste)

console.log(app)

async function generate () {
  const browser = await puppe.launch({
    headless: 'new'
  })
  const page = await browser.newPage()
  await page.setContent(app)
  const pdf = await page.pdf({
    printBackground: true,
    format: 'A4'
  })
  await browser.close()
  return pdf
}

// generate().then(val => {
//   fs.writeFileSync('C:/Users/leand/Área de Trabalho/teste.pdf', val, { encoding: 'utf-8' })
// }).catch((err) => { console.log(err) })
