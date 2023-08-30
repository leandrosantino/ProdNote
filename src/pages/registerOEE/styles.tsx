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
  margin-top: 1.2rem;
  margin-bottom: 2rem;
  padding-bottom: .8rem;
  border-bottom: 1px solid ${p => p.theme.colors.light.gray5};
  tbody{
    max-height: 26rem;
  }
  thead, tbody{
    tr{
      td:first-child, th:first-child{
        width: 20%;
      }
      td:nth-child(1), th:nth-child(1){
        width: 30%;
      }
      td:nth-child(2), th:nth-child(2){
        justify-content: start;
        width: 80%;
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
        width: 5.1rem;
        button{
          height: 3rem;
          width: 2rem;
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
  @media(max-width: 600px){
    margin-top: 4rem;
    td:nth-child(2), th:nth-child(2){
      width: 70% !important;
    }
    td:nth-child(3), th:nth-child(3),
    td:nth-child(5), th:nth-child(5),
    td:nth-child(4), th:nth-child(4){
      display: none
    }
    td:nth-child(6), th:nth-child(6){
      display: none;
    }
  }
`

export const SaveButtonCase = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`

export const ModalContent = styled.div`
  box-shadow: var(--shadown);
  width: 90%;
  max-width: 70rem;
  height: 60%;
  background-color: white;
  border-radius: 1.2rem;
  padding: 1.2rem;
  position: absolute;
  inset: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: .8rem;

  @media (min-width:1000px){
    left: 25.6rem
  }

  h1{
    font-size: 2rem;
  }

  form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    overflow-x: auto;

    &>div:nth-child(1){
      width: 15%;
    }
    &>div:nth-child(2){
      width: 43%;
    }
    &>div:nth-child(3){
      width: 17%;
    }
    &>div:nth-child(4){
      width: 15%;
    }

    @media (max-width: 560px) {
      flex-direction: column;
      div{
        width: 100% !important;
      }
      button{
        width: 100%
      }
    }

    gap: .4rem;
  }

  @media (max-width: 560px) {
    height: fit-content;
    z-index: 110;
  }

`
export const LossesTable = styled(Table.Root)`
  border-bottom: 1px solid ${p => p.theme.colors.light.gray5};
  padding-bottom: .8rem;
  tbody{
    max-height: 17rem;
  }
  thead, tbody{
    th:nth-child(1), td:nth-child(1){
      width: 15%;
    }
    th:nth-child(2), td:nth-child(2){
      width: 48%;
    }
    th:nth-child(3), td:nth-child(3){
      width: 17%;
    }
    th:nth-child(4), td:nth-child(4){
      width: 15%;
    }
    th:nth-child(5), td:nth-child(5){
      width: 5%;
    }
  }
`

export const OeeCell = styled.span`
  data-[error='on']{
    color: ${p => p.theme.colors.light.red11};
  }
`
