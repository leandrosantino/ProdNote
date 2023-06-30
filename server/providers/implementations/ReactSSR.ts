import { ServerStyleSheet } from 'styled-components'
import { type IReactSSR } from '../IReactSSR'
import ReactDOM from 'react-dom/server'

export class ReactSSR implements IReactSSR {
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
