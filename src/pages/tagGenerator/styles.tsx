import styled from 'styled-components'

export const Container = styled.div`

  width: 100%;
  height: 100%;

  display: flex;
  gap: .8rem;

  section{
    flex: 1;
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
