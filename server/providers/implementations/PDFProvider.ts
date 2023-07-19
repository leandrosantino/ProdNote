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
      format: 'A4'
    })
    await browser.close()
    return Buffer.from(pdf)
  }
}
