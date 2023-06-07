import { createGlobalStyle } from 'styled-components'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const GlobalStyle = createGlobalStyle`

  html{
    font-family: 'roboto', sans-serif;
  }

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body{
    background-color: #fff;
    -webkit-font-smoothing: antialiased !important;
  }

`
