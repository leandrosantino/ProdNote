import { Table } from '../../components/Table'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  justify-content: center;
  &>div{
    width: 100%;
    height: 100%;
    max-width: 500px;
    padding: .8rem;

    form{
      margin-top: 1.2rem;
      width: 100%;
    }

  }

`

export const FieldCase = styled.div`
  display: flex;
  gap: .8rem;
  width: 100%;
  height: fit-content;
  justify-content: center;
  align-items: start;
  &>div{
    width: fit-content;
    input, select{
      width: 100%;
    }
  }

  #fieldProduct{
    width: 100%;
    select, input{
      width: 100%;
    }
  }

  #fieldTechnology{
    width: 50%;
    select, input{
      width: 100%;
    }
  }

  #teste{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    width: 100%;
    height: 139px;
    div{
      width: 100%;
    }
    select, input{
      width: 100%;
    }


    #buttons{
      display: flex;
      justify-content: end;
      gap: .8rem;
      button{
        padding: .8rem 1.2rem;
        font-size: 1.4rem;
      }
      button#btDelete{
        background-color: transparent;
        color: ${p => p.theme.colors.light.red11};
        &:hover{
          background-color: ${p => p.theme.colors.light.red4};
        }

      }
    }

  }

  #machinesList{
    padding: .4rem .8rem;
    font-size: 1.2rem;
  }

  #teste:last-child{
    padding-bottom: 2rem;
  }

  &>div:nth-child(1){
    select, input{width: 10rem;}
  }
  &>div:nth-child(2){
    select, input{width: 10rem;}
  }

`

export const ProcessesTable = styled(Table.Root)`

  tbody{
    max-height: 47rem;
    height: 47rem !important;
  }

  td:first-child, th:first-child{
   width: 70%;
   justify-content: start;
  }
  td:last-child, th:last-child{
    width: 10%;
  }
  td:nth-child(4), th:nth-child(4){
    width: 10%;
    button{
      color: ${p => p.theme.colors.light.blue11};
      &:hover{
        background-color: ${p => p.theme.colors.light.blue4};
      }
    }
  }


`

export const SearchField = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .8rem;
  gap: .8rem;
  label{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input, select{
    width: 100%;
    border: 0.15rem solid ${p => p.theme.colors.dark.gray10};
    font-size: 1.4rem;
    padding: .6rem;
    border-radius: .4rem;
    text-indent: .2rem;
  }


`
