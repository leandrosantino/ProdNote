import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%
  }

  @media(max-width: 720px) {
    html {
      font-size: 55%
    }
  }

  body,
  input,
  textarea,
  select,
  button {
    font: 400 1.2rem 'Poppins', sans-serif
  }

  button {
    cursor: pointer
  }

  a {
    color: inherit;
    text-decoration: none;
  }

`
