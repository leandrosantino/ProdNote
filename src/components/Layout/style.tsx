import styled from 'styled-components'

export const Main = styled.main`

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

  &.noAuth{
    grid-template-areas:
      "head head head"
      "content content content";
  }

  &.auth{
    grid-template-areas:
      "head head head"
      "side content content";
  }

`
