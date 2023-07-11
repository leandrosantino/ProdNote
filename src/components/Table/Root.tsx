import styled from 'styled-components'

export const Root = styled.table`
  width: 100%;
  font-size: 1.4rem;
  display: grid;
  grid-template-areas:
    "head"
    "body"
  ;

  grid-template-rows: 4rem auto 3rem;


  thead, tbody{
    tr{
      display: flex;
      width: 100%;

      td:first-child, th:first-child{
        width: 100%;
        justify-content: start;
      }

      td:last-child, th:last-child{
        width: 10%;
      }

      td, th{
        display:flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        padding: .4rem;
      }
    }
  }

`
