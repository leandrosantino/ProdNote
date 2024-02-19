import styled from 'styled-components'
import { Table } from '../../components/Table'

export const Container = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const Content = styled.section`

  width: 100%;
  max-width: 800px;

  h1 {
    font-size: 2.4rem;
  }

  form {
    width: 100%;
    padding: 1.2rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;

    div{
      width: 100%;
    }

    &>div {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: .8rem
    }

  }


`
export const UserTable = styled(Table.Root)`

tbody{
    max-height: 30rem;
    height: 30rem !important;
  }

  td:nth-child(1), th:nth-child(1){
    width: 15%;
  }
  td:nth-child(2), th:nth-child(2){
   flex: 1;
   justify-content: start;
  }
  td:nth-child(3), th:nth-child(3){
    width: 20%;
  }
  td:last-child, th:last-child{
    width: 8%;
  }
  td:nth-child(4), th:nth-child(4){
    width: 8%;
    button{
      color: ${p => p.theme.colors.light.blue11};
      &:hover{
        background-color: ${p => p.theme.colors.light.blue4};
      }
    }
  }

`
