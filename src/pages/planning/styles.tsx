import styled from 'styled-components'

export const Container = styled.div`

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;

  flex-direction: row;

  &>div{
    width: 40rem;
    height: fit-content;
    min-height: 50rem;
    box-shadow: var(--shadow);
    border-radius: 1.2rem;
    background-color: ${p => p.theme.colors.light.gray3};
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: .8rem;
    padding: 2rem;

    h1{
    font-size: 2rem;
    font-weight: 500;
    width: 100%;
    align-items: start;
  }

  }

  @media (max-width: 1200px ) {
    flex-direction: column;
    &>div{
      width: 90%;
    }
  }

`

export const FormCase = styled.div`

  form{
    width: 100%;
    margin-top: 2rem;
    gap: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: start;

  }

  header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${p => p.theme.colors.light.gray8};

    button{
      color: ${p => p.theme.colors.dark.blue7};
      font-weight: 500;
    }

  }

`

export const ProductInputsList = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: .4rem;

  overflow: auto;
  height: 20rem;;

  div{
    display: flex;
    gap: .4rem;
  }

  button{
    width: 2.8rem;
    &:hover{
      color: ${p => p.theme.colors.light.red11}
    }
  }


`
export const MachinesInputsList = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: .4rem;
  div{
    display: flex;
    width: 100%;
    button{
      width: 2.8rem;
      margin-left: .4rem;
      &:hover{
      color: ${p => p.theme.colors.light.red11}
    }
    }
  }

`
export const ProductsLabels = styled.div`
  display: flex;
  gap: .4rem;
  span{
    flex: 1;
    font-size: 1.2rem;
    text-align: center;
    &:last-child{
      flex: none;
      width: 2.8rem;
    }

  }
`
export const ScriptCase = styled.div`

`
