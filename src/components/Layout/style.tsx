import styled from 'styled-components'

export const Main = styled.main`

  font-size: 16px;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 50px auto;
  grid-template-columns: 256px auto;
  header{grid-area: head}
  aside{grid-area: side;}
  section{
    padding: 1.2rem;
    grid-area: content;
    background-color: white
  }

  &.noAuth{
    grid-template-areas:
      "head head head"
      "content content content";
  }

  &.auth{
    grid-template-areas:
      "side head head"
      "side content content";
  }

`
