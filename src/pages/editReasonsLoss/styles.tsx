import styled from 'styled-components'
import { Table } from '../../components/Table'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  max-width: 800px;
`

export const Form = styled.form`
  padding: 1.2rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .8rem;

  &>div:nth-child(2){
    width: 60%;
  }

  button#btDelete{
    background-color: transparent;
    color: ${p => p.theme.colors.light.red11};
    &:hover{
      background-color: ${p => p.theme.colors.light.red4};
    }
  }

`
export const TableCase = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const SearchCase = styled.div`
  width: 100%;
  display: flex;

  &>div:first-child{
    width: 70%;
  }
  &>div:last-child{
    width: 30%;
  }

`

export const ReasonsTable = styled(Table.Root)`

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
