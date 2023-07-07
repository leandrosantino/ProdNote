export interface IPDFProvider {
  createFromHtml: (html: string) => Promise<Buffer>
}
