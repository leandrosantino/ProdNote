import { createGlobalStyle } from 'styled-components'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export const GlobalStyle = createGlobalStyle`

  html{
    font-size: 62.5%;
    font-family: 'roboto', sans-serif;
  }

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  #root{
    font-size: 1.6rem;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-areas:
      "head head head"
      "side content content";
    grid-template-rows: 50px auto;
    grid-template-columns: 200px auto;

    header{grid-area: head}
    aside{grid-area: side;}
    main{
      grid-area: content;
      background-color: ${p => p.theme.palette.background.default}
    }


      /* #ffee44 */

  }

  body{
    background-color: #fff;
    -webkit-font-smoothing: antialiased !important;
  }

`
