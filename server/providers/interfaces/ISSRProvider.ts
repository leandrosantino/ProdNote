export interface ISSRProvider {
  renderToString: <T>(props: T, Component: (props: T) => JSX.Element) => string
}
