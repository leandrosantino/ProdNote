import styled from 'styled-components'

export const Container = styled.div`

  width: 100%;
  height: 100%;

  display: flex;
  gap: .8rem;

  h3{
    width: 100%;
    margin-bottom: 1.2rem;
    text-align: center;
  }

  section{
    flex: 1;
    padding: 0 1.2rem;
  }

  form{
    width: 100%;
    gap: .8rem;
    display: flex;
    align-items: center;
    justify-content: center ;

    .amountField{
      width: 12rem;
    }

    .productField{
      width: 100%;
    }

  }

  section:last-child{
    border: 0.1rem solid ${p => p.theme.colors.dark.gray10};
    border-radius: .4rem;
    flex: 1;
  }

`

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  margin-top: .4rem;
  margin-bottom: 1.2rem;
  background-color: ${p => p.theme.colors.light.gray5};
`

export const Table = styled.table`
  width: 100%;
  font-size: 1.4rem;

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

export const Thead = styled.thead`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${p => p.theme.colors.light.gray5};
`

export const Tbody = styled.tbody`
  font-size: 1.2rem;
  height: 1rem;
  overflow-x: scroll;

  tr{
    border-bottom: 1px solid ${p => p.theme.colors.light.gray8};

    td button{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.4rem;
      height: 2.4rem;
      border-radius: .4rem;
      color: ${p => p.theme.colors.light.red11};
      font-weight: 600;
      &:hover{
        background-color: ${p => p.theme.colors.light.red4};
      }
    }

  }
`
export const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  font-size: 1.2rem;
  margin-top: 1.2rem;
  padding: 0 .8rem;

  span{
    color: ${p => p.theme.colors.light.gray10};
  }

`
