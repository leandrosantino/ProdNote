import styled from 'styled-components'
import { Button } from '../../components/Form/Botton'
import { Table } from '../../components/Table'

const maxWidth = '800px'

export const Container = styled.div`

  --max-width: ${maxWidth};

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .8rem;
  padding: 1.2rem;

  h2, h3{
    width: 100%;
    max-width: var(--max-width);
  }

  section{
    display: flex;
    justify-content: start;
    width: 100%;
    max-width: var(--max-width);

    &>div:last-child{
      flex: 1;
      width: 100%;
      padding: 0 .8rem;
      gap: .4rem;
    }

  }

  @media(max-width: 600px){
    section{
      flex-direction: column;
    }
  }


`

export const MessageContainer = styled.div`
  width: 22rem;
  height: 100%;
  border-radius: 1.2rem;
  border: 2px solid ${p => p.theme.colors.dark.gray5};
  display: flex;
  justify-content: center;
  align-items: center;
  @media(max-width: 600px){
    width: 100%;
    height: min-content;
    margin-bottom: 1.2rem;
  }
`

export const InfoCase = styled.div`
  flex: 1;
  font-size: 1.2rem;
  span{
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div{
    width: 100%;
    min-height: 3rem;
    min-width: 4%;
    padding: .4rem;
    border: 1px solid ${p => p.theme.colors.dark.gray5};
    border-radius: .4rem;
    display: flex;
    align-items: center;
  }
  button{
    height: 100%;
  }


`
export const InfoGroup = styled.div`
  display: flex;
  /* justify-content: end; */
  align-items: end;
  flex: 1;
  gap: .4rem;
`
export const RegisterButton = styled(Button)`
  font-size: 1.4rem;
  padding: .8rem 2rem;
`

export const RecentTagsTable = styled(Table.Root)`
  thead, tbody{
    tr{
      td:first-child, th:first-child{
        width: 80%;
        justify-content: start;
      }
      td:nth-child(2), th:nth-child(2){
        width: 40%;
        @media(max-width: 600px){
          display: none;
        }
      }
      td:last-child, th:last-child{
        width: 10%;
      }
    }
  }

`
