import styled from 'styled-components'
import { Table } from '../../components/Table'

export const Container = styled.div`
  width: 100%;
  height: 100;
  display: flex;
  justify-content: center;
  align-items: start;

  &>div{
    width: 100%;
    max-width: 800px;
    padding: .8rem;
  }

  form{
    width: 100%;
    display: flex;
    flex-direction: column;

    div{
      display: flex;
      gap: .8rem;
      justify-content: center;
      align-items: center;

      @media (max-width: 800px) {
        flex-wrap: wrap
      }
      div {
        width: 100%;
      }

    }

    label{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    #processInputCase{
      min-width: 40%;
    }

    button{
      padding: 1rem;
      font-size: 1.4rem;
      @media (max-width: 800px) {
       width: 100%
      }
    }

  }

`

export const RecordsTable = styled(Table.Root)`
  thead, tbody{
    tr{
      td:first-child, th:first-child{
        width: 20%;
      }
      td:nth-child(2), th:nth-child(2){
        justify-content: start;
        width: 80%;
        @media(max-width: 600px){
          display: none;
        }
      }
      td:nth-child(6), th:nth-child(6){
        width: 30%;
        button{
          width: 100%;
          height: 3rem;
          color: ${p => p.theme.colors.light.blue11};
          &:hover{
            background-color: ${p => p.theme.colors.light.blue4};
          }
        }
      }
      td:nth-child(7), th:nth-child(7){
        button{
          height: 3rem;
          width: 3rem;
          color: ${p => p.theme.colors.light.blue11};
          &:hover{
            background-color: ${p => p.theme.colors.light.blue4};
          }
        }
      }

      td:last-child, th:last-child{
        width: 10%;
        button{
          width: 3rem;
          height: 3rem;
        }
      }
    }
  }
`
