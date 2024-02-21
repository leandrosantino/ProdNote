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
    margin-bottom: 2.4rem;
  }

`

export const HistoryTable = styled(Table.Root)`

tbody{
    max-height: 30rem;
    height: 30rem !important;
  }

  td:nth-child(1), th:nth-child(1){
    width: 30%;
  }
  td:nth-child(2), th:nth-child(2){
   flex: 1;
   justify-content: start;
  }

`
