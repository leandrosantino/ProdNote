import styled from 'styled-components'

export const Main = styled.main`

  font-size: 1.6rem;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 5rem auto;
  grid-template-columns: 25.6rem auto;
  header{grid-area: head}
  aside{grid-area: side;}
  section{
    padding: 1.2rem;
    grid-area: content;
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
