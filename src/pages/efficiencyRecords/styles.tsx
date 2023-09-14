import { Table } from '../../components/Table'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  &>div{
    width: 100%;
    height: 100%;
    max-width: 1000px;
  }

`

export const Header = styled.header`


`
export const FiltersCase = styled.form`
  width: 100%;
  padding: 1.6rem 0;
  display: flex;
  gap: .8rem;


  &>div:nth-child(2){
    input{width: 25rem;}
  }

  &>div{
    select{width: fit-content;}
  }

`

export const DataTable = styled(Table.Root)`
  font-size: 1.2rem !important;
  tbody{
    max-height: 45rem;
  }
  thead, tbody{
    tr{
      td:nth-child(1), th:nth-child(1){
        width: 10%;
      }
      td:nth-child(2), th:nth-child(2){
        width: 40%;
        justify-content: start;
      }
      td:nth-child(3), th:nth-child(3){
        width: 7%;
      }
      td:nth-child(4), th:nth-child(4){
        width: 8%;
      }
      td:nth-child(5), th:nth-child(5){
        width: 10%;
      }
      td:nth-child(6), th:nth-child(6){
        width: 10%;
      }
      td:nth-child(7), th:nth-child(7){
        width: 15%;
      }
    }
  }

`
