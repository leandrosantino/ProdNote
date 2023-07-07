import { ServerStyleSheet } from 'styled-components'
import { type ISSRProvider } from '../interfaces/ISSRProvider'
import ReactDOM from 'react-dom/server'

export class SSRProvider implements ISSRProvider {
  renderToString<T>(props: T, Component: (props: T) => JSX.Element) {
    const stylesheet = new ServerStyleSheet()
    const html = ReactDOM.renderToString(stylesheet.collectStyles(Component(props)))
    return `
      <html>
        <head>
          ${stylesheet.getStyleTags()}
        </head>
        <body>
          ${html}
        </body>
      </html>
    `
  }
}
