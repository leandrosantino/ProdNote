import { type IPDFProvider } from '../interfaces/IPDFProvider'
import puppe from 'puppeteer'

export class PDFProvider implements IPDFProvider {
  async createFromHtml (html: string) {
    const browser = await puppe.launch({
      headless: 'new'
    })
    const page = await browser.newPage()
    await page.setContent(html)
    const pdf = await page.pdf({
      printBackground: true,
      format: 'A4',
      width: 210,
      height: 297,
      margin: {
        top: '6mm',
        bottom: '7mm',
        left: '5mm',
        right: '5mm'
      }
    })
    await browser.close()
    return Buffer.from(pdf)
  }
}
