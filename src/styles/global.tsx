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

  .auth, .noAuth{
    font-size: 16px;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 50px auto;
    grid-template-columns: 200px auto;
    header{grid-area: head}
    aside{grid-area: side;}
    section{
      grid-area: content;
      background-color: ${p => p.theme.palette.background.default}
    }
  }

  .noAuth{
    grid-template-areas:
      "head head head"
      "content content content";
  }

  .auth{
    grid-template-areas:
      "head head head"
      "side content content";
  }

  body{
    background-color: #fff;
    -webkit-font-smoothing: antialiased !important;
  }

`
