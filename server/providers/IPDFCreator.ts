export interface IPDFCriator {
  createFromHtml: (html: string) => Promise<Buffer>
}
