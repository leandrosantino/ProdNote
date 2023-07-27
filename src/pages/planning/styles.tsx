import styled from 'styled-components'
import { Table } from '../../components/Table'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.2rem;
`
export const ScriptTable = styled(Table.Root)`
  max-width: 800px;
  font-size: 1.2rem;
  max-height: 37%;

  @media (max-width: 600px){
    font-size: .8rem
  }


`

export const FormCase = styled.div`
  width: 100%;
  max-width: 800px;

  h2{
    width: 100%;
    margin-bottom: 1.2rem;
  }

  form{
   .machine{
      margin-bottom: .8rem;
    }
    &>div{
      /* font-size: 1.2rem; */
      display: flex;
      justify-content: start;
      align-items: center;
      gap: .8rem;
      /* max-width: 42rem; */

      .productCase{
        border: 1px solid black;
        padding: .4rem;
        border-radius: .4rem;
      }

    }
  }


`
