export interface IReactSSR {
  renderToString: <T>(props: T, Component: (props: T) => JSX.Element) => string
}
